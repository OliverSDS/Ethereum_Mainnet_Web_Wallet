import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Wallet from './wallet';
import CryptoJS from 'crypto-js';



export default function Home() {

  const randomBytes = CryptoJS.lib.WordArray.random(32);
  const privateKey = randomBytes.toString(CryptoJS.enc.Hex);
  console.log(privateKey);

    const [tempText , setText ] = useState("")
    
    const [key,setKey] = useState(null);


    console.log(key);
    const GenerateKey=()=>{
      alert(privateKey)
      localStorage.setItem("key", privateKey);
      setKey(privateKey)
    }
    const saveKey = (e)=>{
      console.clear()
      localStorage.setItem("key", tempText);
      setKey(tempText)
     
    }

    useEffect(()=>{
      let key = localStorage.getItem("key");
      console.log(key);
      if(key !=null ){
        setKey(key)
      }
  
    },[])

  return (
    <div >
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
        <title>Web_Wallet</title>
        <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css" />
        <link rel="stylesheet" href="assets/css/animated-textbox3-textbox.css" />
        <link rel="stylesheet" href="assets/css/animated-textbox3.css" />
        <link rel="stylesheet" href="assets/css/divider-text-middle.css" />
      </Head>

      <main>
    {key == null ? <center>
      <button onClick={GenerateKey}>Generate Wallet</button>
      <hr></hr>
      <input type="text"  placeholder='Ethereum Private Key' value={tempText} onChange={event => setText(event.target.value) }/>
      <button onClick={saveKey}>Save Key</button>
      </center>
    : <Wallet private={key}/>}
      
      </main>

      <script src="assets/bootstrap/js/bootstrap.min.js"></script>

    </div>
  )
}
