import { useState,useEffect } from "react";
import Web3 from 'web3';
import { toast } from "react-toastify";

export const useWeb3 = () => {
  const [web3, setWeb3] = useState<Web3>();
  const [address, setAddress] = useState('');

  const connectKardiaChainExtension = async () => {
    if (!window.kardiachain) {
      console.log('KardiaChain extension is not installed!');
      return;
    }
    await window.kardiachain.enable()
    const web3 = new Web3(window.kardiachain)
    const [accounts] = await web3.eth.getAccounts()
    const accountsChecksum = web3.utils.toChecksumAddress(accounts)
    setAddress(accountsChecksum);
    setWeb3(web3);
  };

  const connectMetamask = async () => {
    if (!window.ethereum) {
      console.log('MetaMask is not installed!');
      return;
    }
    try {
    await window.ethereum.request({method:"eth_requestAccounts"});
    const web3 = new Web3(window.ethereum)
    const [accounts] = await web3.eth.getAccounts();
    const accountsChecksum = web3.utils.toChecksumAddress(accounts)
    setAddress(accountsChecksum);
    setWeb3(web3);
    } catch (error) {
        toast.error("Please connect wallet");
    }
  };

const handleConnect = async() =>{
    const { ethereum } = window;
    const [accounts] = await ethereum.eth.getAccounts();
    const accountsChecksum = ethereum.utils.toChecksumAddress(accounts)
    setAddress(accountsChecksum);

}


    useEffect(() => {
    const { ethereum } = window;
    if (ethereum && ethereum.on) {
    
      const handleAccountsChanged = (accounts:any) => {
        const accountsChecksum = ethereum.utils.toChecksumAddress(accounts)
        setAddress(accountsChecksum);
      };

      ethereum.on('connect', handleConnect);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
        }
      };
    }
  }, []);

  return {web3, address, connectKardiaChainExtension, connectMetamask}
};