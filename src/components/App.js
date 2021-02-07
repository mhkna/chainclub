import React, { useState, useEffect, useRef } from 'react';
import Web3 from 'web3';
import ChainClub from '../abis/ChainClub.json'
import Main from './Main'

function App() {
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState('')
  const [chainclub, setChainclub] = useState('')
  const [postArr, setPostArr] = useState([])
  //// TEMP
  const renderCount = useRef(1)

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    renderCount.current = renderCount.current + 1
  })

  async function loadData() {
    const web3 = await new Web3(Web3.givenProvider || 'http://localhost:7545')
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0])
    const networkId = await web3.eth.net.getId()
    const chainclub = await web3.eth.Contract(ChainClub.abi, ChainClub.networks[networkId].address)
    setChainclub(chainclub)
    const postCount = await chainclub.methods.postCount().call()
    for (let i = 1; i <= postCount; i++) {
      const post = await chainclub.methods.posts(i).call()
      setPostArr(prevPostArr => [...prevPostArr, post])
    }
    setLoading(false)
  }

  return (
    <div>
      { loading
        ? <div>Loading...</div>
        : <Main account={account}/>
      }
      <div>Rendered {renderCount.current} times.</div>
    </div>
  );
}

export default App;
