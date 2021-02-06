import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
// import './App.css';
// import ChainClub from '../abis/ChainClub.json'
import Main from './Main'


function App() {
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState('')

  useEffect(() => {
    loadWeb3()
    setLoading(false)
  }, [])

  async function loadWeb3() {
    if (window.ethereum) {
      try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          await setAccount(accounts[0])
      } catch (error) {
          window.alert('User denied account access.')
      }
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('This requires an Ethereum compatible browser or extension.')
    }
  }

  return (
    <div>
      { loading
        ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
        : <Main account={account}/>
      }
    </div>
  );
}

export default App;
