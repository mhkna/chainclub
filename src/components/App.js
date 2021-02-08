import React, { useState, useEffect, useRef } from 'react';
import Web3 from 'web3';
import ChainClub from '../abis/ChainClub.json'
import Main from './Main'
// import fs from 'promise-fs'

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

function App() {
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState('')
  const [chainclub, setChainclub] = useState({})
  const [postArr, setPostArr] = useState([])

  const renderCount = useRef(1)

  useEffect(() => {
    loadInitial()
  }, [])

  useEffect(() => {
    renderCount.current = renderCount.current + 1
  })

  async function loadInitial() {
    const web3 = await new Web3(Web3.givenProvider || 'http://localhost:7545')
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0])
    const networkId = await web3.eth.net.getId()
    const chainclub = await web3.eth.Contract(ChainClub.abi, ChainClub.networks[networkId].address)
    setChainclub(chainclub)
    const postCount = await chainclub.methods.postCount().call()
    for (let i = 1; i <= postCount.toNumber(); i++) {
      const post = await chainclub.methods.posts(i).call()
      setPostArr(prevPostArr => [...prevPostArr, post])
    }
    setLoading(false)
  }

  function addPost(buffer, text) {
    ipfs.add(buffer, (err, result) => {
      if(err) {
        return console.error(err)
      }
      chainclub.methods.addPost(result[0].hash, text)
      .send({ from: account })
      .on('transactionHash', (hash) => {
        setLoading(false)
      })
    })
  }

  return (
    <div>
      { loading
        ? <div>Loading...</div>
        : <Main
            account={account}
            addPost={addPost}
            postArr={postArr}
          />
      }
      <div>Rendered {renderCount.current} times.</div>
    </div>
  );
}

export default App;
