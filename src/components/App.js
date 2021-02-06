import React, { useState } from 'react';
import Web3 from 'web3';
import './App.css';
import ChainClub from '../abis/ChainClub.json'
import Main from './Main'


function App() {
  const [loading, setLoading] = useState(true)

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert("Ethereum compatible browser or extension required.")
    }
},

  return (
    <div>
      { loading
        ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
        : <Main />
      }
    </div>
  );
}

export default App;
