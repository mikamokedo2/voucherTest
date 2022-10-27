import { useState, useEffect,createContext, useContext, Dispatch, SetStateAction } from "react";
import Web3 from "web3";
import { toast } from "react-toastify";
import shodiContract from "./contract";
import { Contract } from "web3-eth-contract";
import axios from "axios";
import { serverURL } from "../constants/const";


const chainIdKai  = "0xF2";
const chainIdBsc  = "0x61";
const urlKai = "https://dev.kardiachain.io/";
const urlBsc = "https://data-seed-prebsc-1-s1.binance.org:8545/";
const symbol = "KAI";
const blockExplorerUrlsKai = "https://explorer-dev.kardiachain.io";
const blockExplorerUrlsBsc = "https://testnet.bscscan.com/";
interface ContextType{
    web3?:Web3;
    address:string;
    connectMetamask?:() => void;
    contract?:Contract;
    netWork:string;
    setNetWork?:Dispatch<SetStateAction<string>>;
    adminWallet:string;
    rateConvert:number;
  }
  const initialState:ContextType = {
    web3:undefined,
    address:"",
    contract:undefined,
    netWork:"",
    adminWallet:"",
    rateConvert:1,
  };
  
  export const AuthContext = createContext(initialState);
  
  export const useWeb3 = () => {
    return useContext(AuthContext);
  };

  interface AuthProviderProps{
    children: React.ReactNode
  }



  const AuthProvider:React.FC<AuthProviderProps> = ({ children }) => {
  const [web3, setWeb3] = useState<Web3>();
  const [address, setAddress] = useState("");
  const [contract, setContract] = useState<Contract>();
  const [netWork, setNetWork] = useState("");
  const [adminWallet, setAdminWallet] = useState("");
  const [contractWallet, setContractWallet] = useState("");
  const [rateConvert, setRateConvert] = useState(1);

  useEffect(() => {
    const getAdminWallet = async () => {
      try {
        const { data } = await axios.get(`${serverURL}/adminWalletAddress?type=${netWork}`);
        if (data.success) {
          setAdminWallet(data.data.wallet);
          setRateConvert(data.data.rate);
          setContractWallet(data.data.contractAddress)
        }
      } catch (error) {
        console.log(error);
      }
    };
    if(netWork !== ""){
      getAdminWallet();
    } 
  }, [netWork]);




  useEffect(() => {
    if (web3 && contractWallet !== "") {
      setContract(shodiContract(web3,contractWallet));
    }
  }, [web3,contractWallet]);


const handleConnectSuccess = async() =>{
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const [accounts] = await web3.eth.getAccounts();
        const accountsChecksum = web3.utils.toChecksumAddress(accounts);
        setAddress(accountsChecksum);
        setWeb3(web3);
    }
}

  const switchNetworkKai = async () => {
    if (window.ethereum) {
      try {
        // Try to switch to the Mumbai testnet
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId:chainIdKai }], // Check networks.js for hexadecimal network ids
        });
        handleConnectSuccess();
      } catch (error:any) {
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {   
                  chainId: chainIdKai,
                  chainName: 'Kai Testnet',
                  rpcUrls: [urlKai],
                  nativeCurrency: {
                      name: "KAI TESTNET",
                      symbol,
                      decimals: 18
                  },
                  blockExplorerUrls: [blockExplorerUrlsKai]
                },
              ],
            });
            handleConnectSuccess();
          } catch (error:any) {
            toast.error(error.message);
          }
        }
        toast.error(error.message);
      }
    } else {
      toast.error('MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html');
    } 
      }

      const switchNetworkBsc = async () => {
        if (window.ethereum) {
          try {
            // Try to switch to the Mumbai testnet
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId:chainIdBsc }], // Check networks.js for hexadecimal network ids
            });
            handleConnectSuccess();
          } catch (error:any) {
            if (error.code === 4902) {
              try {
                await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {   
                      chainId: chainIdBsc,
                      chainName: 'Bsc Testnet',
                      rpcUrls: [urlBsc],
                      nativeCurrency: {
                          name: "KAI TESTNET",
                          symbol,
                          decimals: 18
                      },
                      blockExplorerUrls: [blockExplorerUrlsBsc]
                    },
                  ],
                });
                handleConnectSuccess();
              } catch (error:any) {
                toast.error(error.message);
              }
            }
            toast.error(error.message);
          }
        } else {
          toast.error('MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html');
        } 
          }

  const connectKardiaChainExtension = async () => {
    if (!window.kardiachain) {
      console.log("KardiaChain extension is not installed!");
      return;
    }
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const web3 = new Web3(window.kardiachain);
    const [accounts] = await web3.eth.getAccounts();
    const accountsChecksum = web3.utils.toChecksumAddress(accounts);
    setAddress(accountsChecksum);
    setWeb3(web3);
  };

  const connectMetamask = async () => {
    if(netWork === "kai"){
      switchNetworkKai();
    }
    else{
      switchNetworkBsc();
    }
    
  };

  useEffect(() =>{
    if(window.ethereum) {
      window.ethereum.on('accountsChanged', function () {
        if(!web3){
          return;
        }
        web3.eth.getAccounts(function(error, accounts) {
          setAddress(accounts[0]);
          });
      });
  }

  },[web3])




  return <AuthContext.Provider value={{netWork,web3,address,setNetWork,connectMetamask,contract,adminWallet,rateConvert}}>{children}</AuthContext.Provider>;

};

export default AuthProvider;