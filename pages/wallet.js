import Tx from 'ethereumjs-tx'
import Web3 from 'web3';
import { useEffect, useState } from 'react';
export default function Wallet(key){

const Api_Key = "infura-api-key"

const web3 = new Web3('https://mainnet.infura.io/v3/'+ Api_Key);

const [privateKey, setPrivateKey] = useState(key.private);
const [toAddress, setToAddress] = useState('0x');
const [value, setValue] = useState('0');
const [gas, setGas] = useState('10');

const [balance, setBalance] = useState('');

const account = web3.eth.accounts.privateKeyToAccount(privateKey);

useEffect(()=>{
    web3.eth.getBalance(account.address, (err, balance) => {
        if (err) {
          console.error('Error getting balance:', err);
        } else {
          
          const etherBalance = web3.utils.fromWei(balance, 'ether');
          setBalance(etherBalance)
          console.log('Account balance:', etherBalance, 'ETH');
        }
      });
},[])

const handleSendTransaction = () => {
  const txValue = web3.utils.toWei(value, 'ether');
  web3.eth.getTransactionCount(account.address, (err, txCount) => {
    const txObject = {
      nonce: web3.utils.toHex(txCount),
      to: toAddress,
      value: web3.utils.toHex(txValue),
      gasLimit: web3.utils.toHex(21000),
      gasPrice: web3.utils.toHex(web3.utils.toWei(gas, 'gwei')),
    };
    const tx = new Tx(txObject, { chain: 'mainnet' });
    
    tx.sign(Buffer.from(privateKey, 'hex'));

    const serializedTx = tx.serialize();
    const raw = '0x' + serializedTx.toString('hex');

    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
      console.log('Transaction Hash:', txHash);
    });
  });
};

    const logout =()=>{
        localStorage.removeItem("key");
        location.reload()

    }
    return(
        <div>
        <div className="container">
          <h1 className="text-center" style={{fontWeight: 'bold', color: 'rgba(34,110,147,1)', fontSize: '24px', lineHeight: '66px'}}>Ethereum Web Wallet</h1>
        </div>
        <div style={{backgroundColor: '#ededed'}} />
        <div style={{textAlign: 'center'}}>
          <h2 className="divider-style" style={{marginTop: '12px'}}><span>Balance : {balance + " ETH"}</span></h2>
          <h2 className="divider-style" style={{marginTop: '12px'}}><span>{account.address}</span></h2>

        </div>
        <div className="container">  <span>
            <input className="gate" id="element" type="text" placeholder="Destination Address" onChange={e =>setToAddress(e.target.value)} /><label htmlFor="element">To
            </label>
          </span>  <span>
            <input className="gate" id="element" type="number" value="0" placeholder="Ether Value" onChange={(e) =>setValue(e.target.value)}/><label htmlFor="element">Value</label>
          </span>  <span>
            <input className="gate" id="element" type="text" placeholder="Gwei" onChange={e => setGas(e.target.value)}/><label htmlFor="element">Gas </label>
          </span><button className="btn btn-danger" style={{border: 'none', width: '151px', height: '58px', marginLeft: '14px', backgroundColor: '#3abaa1', color: 'rgb(255,255,255)', marginTop: '12px'}} type="button" onClick={handleSendTransaction}>Send Ether</button></div>
            <center><button className="btn btn-danger" style={{border: 'none', width: '151px', height: '58px', marginLeft: '14px', backgroundColor: '#3abaa1', color: 'rgb(255,255,255)', marginTop: '12px'}} type="button" onClick={logout}>Logout</button>
</center> 
      </div>
    )
}