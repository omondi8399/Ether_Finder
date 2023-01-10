import React, { useState, useEffect } from 'react'
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import Image from 'next/image';

import imageLogo from "../assets/logo.png";
import creator from "../assets/creator1.png"

const Home = () => {

  const [currentAccount, setCurrentAccount] = useState('')
  const [connect, setConnect] = useState(false)
  const [balance, setBalance] = useState('')

const failMessage = "Please install Metamask and Connect your Metamask"
const successMessage = "Your Account has successfully connected to Metamask"

const INFURA_ID = "eyJhbiOjE2NzA5MzA1MDY3NzMsIm5hbWUikYXRhIn0"
const provider = new ethers.providers.JsonRpcProvider(`http://mainnet.infura.io/v3/${INFURA_ID}`)
  
const checkIfWalletConnected = async()=>{
  if(!window.ethereum) return

  const accounts = await window.ethereum.request({ method: "eth_accounts"})
  // console.log(accounts)

  if(accounts.length){
    setCurrentAccount(accounts[0])
  } else {
    return failMessage
  }
  const address = "0xiemieok3ok03pw302449jefnwjfmg2ome"
  const balance = await provider.getBalance(address)
  const showBalance = `${ethers.utils.formatEther(balance)} ETH\n`
  // console.log(showBalance)
  setBalance(showBalance)
}
const CWallet = async()=>{
  if(!window.ethereum) return console.log(failMessage)

  const accounts = await window.ethereum.request({ method: "eth_requestAccounts"})

  setCurrentAccount(accounts[0])

  window.location.reload()
}
useEffect(() => {
   checkIfWalletConnected()
})

useEffect(() => {
  async function accountChanged() {
    window.ethereum.on("accountsChanged", async function () {
      const accounts = await window.ethereum.request({ method: "eth_accounts",
    })

    if(accounts.length){
      setCurrentAccount(accounts[0])
    } else {
      window.location.reload()
    }
    })
  }
  accountChanged()

}, [])


return (
    <div className='card-container'>
      {!currentAccount ? "" : <span className='pro'>ROJAS</span>}
      <Image src={creator} alt='profile' width={80} height={80} />
      <h3>Check Ether</h3>

      {!currentAccount ? (
        <div>
        <div className='message'>
         <p>{failMessage}</p>
        </div>

        <Image src={imageLogo} alt='ether' width={100} height={100} />
        <p> Welcome to ether account balance checker</p>
        </div>
      ) : (
        <div>
          <h6> Verified <span className='tick'> &#10004;</span> 
          </h6>
          
          {/* <P>Ether account and balance checker <br /> Find account details</P> */}
          <div className='buttons'>
            <button className='primary ghost' onClick={()=> {}}>
              Ether Account Details
            </button>
          </div>
        </div>
      )}

      {!currentAccount && !connect ? (
        <div className='button'>
          <button className='primary' onClick={()=> CWallet()}> Connect Wallet</button>
        </div>
      ): (
        <div className='skills'>
          <h6>Your Ether</h6>
          <ul>
            <li>Account</li>
            <li>{currentAccount}</li>
            <li>Balance</li>
            <li>{balance}</li>
          </ul>
        </div>
      )}
      
      </div>
  )
      }

export default Home