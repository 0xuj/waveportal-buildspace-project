import { useEffect, useState } from 'react'
import logo from './logo.svg'
import {ethers} from 'ethers';
import abi from "./utils/WebPortal.json";

function App() {
  const [allWaves,setAllWaves] = useState([])
  const [currentAccount,setCurrentAccount] = useState("");
  const contaractAddress="0x9aD90cEe6ECEE99a346B8f9B3eAd78c66D5B12ea"
  const contractABI = abi.abi;

  const getAllWaves = async () => {
    try {
      const {ethereum} = window;

      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        const waves = await wavePortalContract.getAllWaves();

        let waveCleaned = [];
        waves.forEach(waves => {
          waveCleaned.push({
            address:wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message:wave.message
          })
        })
        setAllWaves(waveCleaned);
      } else {
        console.log("ethereum object doesn't exits !!!")
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  const wave = async() => {
    try {
      
      const {ethereum} = window;

      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contaractAddress,contractABI,signer);

        let count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...",count.toNumber());

        const waveTxn = await wavePortalContract.wave("this is a message")

        console.log("Mining...",waveTxn.hash);

        await waveTxn.wait();
        console.log("Minted --",waveTxn.hash);

        count = await wavePortalContract.getTotalWaves();
        console.log("Retrieed total wave count",count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist !");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const checkIfWalletIsConnected = async () => {
    try{
    
      const {ethereum} = window;

    if(!ethereum){
      console.log("Make sure you have metamask!");
    } else {
      console.log("We have the ethererum object",ethereum);
    }

    const accounts = await ethereum.request({method: "eth_accounts"});

    if(accounts.length !== 0){
      const account = accounts[0];
      console.log("Found an authorized account:",account);
      setCurrentAccount(account)
    }else{
      console.log("No authorized account found")
    }
  }catch(error){
    console.log(error);
    }
  }

  const connectWallet = async () => {
    try {
      const {ethereum} = window;

      if(!ethereum){
        alert("Get Metamask");
        return
      }
      const accounts = await ethereum.request({ method: "eth_requestAccounts"})
      console.log("Connected",accounts[0]);
      getAllWaves();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    checkIfWalletIsConnected();
  },[])
  
  
  return (
  
    <div className="flex flex-col    py-2 bg-black text-white">
        <div className="flex item-center justify-between  text-center font-bold text-yellow-400 mx-4 my-2 border-b pb-3 border-yellow-500">
        <div className="hover:underline text-3xl text-yellow-400">👋 Wave-Portal</div>
        <span className="font-semibold text-xs bg-yellow-500 text-black rounded-md flex py-2 px-1">{currentAccount}</span>
        
        </div>
        
      <div className="flex flex-col  justify-center items-center min-h-screen  py-10 ">
        
        <div className=" font-semibold text-2xl m-4 text-center ">
          This is not a starter project this is a finisher project. A project of gods.
        </div>
        <button className=" bg-yellow-400 cursor-pointer text-black ring-0 px-3  py-2 mx-8  rounded-md font-semibold" onClick={wave}>
          Wave
        </button>
        {!currentAccount && (
          <button className=" bg-yellow-500 cursor-pointer text-black ring-0 px-3  py-2 mx-8  rounded-md font-semibold" onClick={connectWallet}>
          Connect Metamask
        </button>
        )}
        {allWaves.map((wave,index) => {
          return(
            <div key={index} className="m-3 p-3 border border-yellow-500">
            <div>Address: {wave.address}</div>
            <div>Time: {wave.timestamp.toString()}</div>
            <div>Message: {wave.message}</div>
            </div>
          )
        })}
      </div>
    </div>
  
  )
}

export default App
