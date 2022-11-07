import {
  useState,
  useEffect,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";
import Web3 from "web3";
import { toast } from "react-toastify";
import shodiContract from "./contract";
import { Contract } from "web3-eth-contract";
import axios from "axios";
import { serverURL } from "../constants/const";
import { useRouter } from "next/router";

const chainIdKai = "0xF2";
const chainIdBsc = "0x61";
const urlKai = "https://dev.kardiachain.io/";
const urlBsc = "https://data-seed-prebsc-1-s1.binance.org:8545/";
const symbol = "KAI";
const blockExplorerUrlsKai = "https://explorer-dev.kardiachain.io";
const blockExplorerUrlsBsc = "https://testnet.bscscan.com";
const chainNumberBsc = 97;
const chainNumberKai = 242;
import en from "../locales/en";
import vn from "../locales/vn";

interface ContextType {
  web3?: Web3;
  address: string;
  connectMetamask?: (type:"kai" | "bsc") => void;
  contract?: Contract;
  netWork: string;
  setNetWork?: Dispatch<SetStateAction<string>>;
  adminWallet: string;
  rateConvert: number;
  balance: number;
  fetchBalance?: () => void;
  getAdminWallet?: () => Promise<any>;
  logOut?:() => void;
  isDisconnect:boolean;
  setIsDisconnect?:Dispatch<SetStateAction<boolean>>;
}
const initialState: ContextType = {
  web3: undefined,
  address: "",
  contract: undefined,
  netWork: "",
  adminWallet: "",
  rateConvert: 1,
  balance: 0,
  isDisconnect:false,
  
};

export const AuthContext = createContext(initialState);

export const useWeb3 = () => {
  return useContext(AuthContext);
};

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : vn;
  const [web3, setWeb3] = useState<Web3>();
  const [address, setAddress] = useState("");
  const [contract, setContract] = useState<Contract>();
  const [netWork, setNetWork] = useState("");
  const [adminWallet, setAdminWallet] = useState("");
  const [contractWallet, setContractWallet] = useState("");
  const [rateConvert, setRateConvert] = useState(1);
  const [balance, setBalance] = useState(0);
  const [isDisconnect, setIsDisconnect] = useState(false);
  

  const getAdminWallet = useCallback(async () => {
    if (netWork === "") {
      return;
    }
    try {
      const { data } = await axios.get(
        `${serverURL}/adminWalletAddress?type=${netWork}`
      );
      if (data.success) {
        setAdminWallet(data.data.wallet);
        setRateConvert(data.data.price / 1000);
        setContractWallet(data.data.contractAddress);
      }
    } catch (error) {
      console.log(error);
    }
  }, [netWork]);

  useEffect(() => {
    getAdminWallet();
  }, [netWork]);

  useEffect(() => {
    if (web3 === undefined || contractWallet === "") {
      return;
    }

    setContract(shodiContract(web3, contractWallet));
  }, [web3, contractWallet]);

  const handleConnectSuccess = async (type:"kai" | "bsc") => {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const web3 = new Web3(window.ethereum);
      if (web3 !== undefined) {
        setWeb3(web3);
        const [accounts] = await web3.eth.getAccounts();
        web3.eth.defaultAccount = accounts;
        setAddress(accounts);
        localStorage.setItem("voucher-chain",type)
      }
    }
  };

  const switchNetworkKai = async () => {
    if (window.ethereum) {
      try {
        // Try to switch to the Mumbai testnet
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: chainIdKai }], // Check networks.js for hexadecimal network ids
        });
        handleConnectSuccess("kai");
      } catch (error: any) {
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: chainIdKai,
                  chainName: "Kai Testnet",
                  rpcUrls: [urlKai],
                  nativeCurrency: {
                    name: "KAI TESTNET",
                    symbol,
                    decimals: 18,
                  },
                  blockExplorerUrls: [blockExplorerUrlsKai],
                },
              ],
            });
            handleConnectSuccess("kai");
          } catch (error: any) {
            console.log(error.message);
          }
        }
      }
    } else {
      toast.error(`
        ${t.installMeta}"https://metamask.io/download.html"
      `);
    }
  };

  const switchNetworkBsc = async () => {
    if (window.ethereum) {
      try {
        // Try to switch to the Mumbai testnet
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: chainIdBsc }], // Check networks.js for hexadecimal network ids
        });
        handleConnectSuccess("bsc");
      } catch (error: any) {
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: chainIdBsc,
                  chainName: "Bsc Testnet",
                  rpcUrls: [urlBsc],
                  nativeCurrency: {
                    name: "BNB TESTNET",
                    symbol: "TBNB",
                    decimals: 18,
                  },
                  blockExplorerUrls: [blockExplorerUrlsBsc],
                },
              ],
            });
            handleConnectSuccess("bsc");
          } catch (error: any) {
            console.log(error.message);
          }
        }
      }
    } else {
      toast.error(`
        ${t.installMeta}"https://metamask.io/download.html"
      `);
    }
  };

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

  const connectMetamask = async (type:"kai" | "bsc") => {
    if (type === "kai") {
      switchNetworkKai();
    } else {
      switchNetworkBsc();
    }
  };
  const fetchBalance = async () => {
    if (!contract || address === "") {
      return;
    }
    const result = await contract.methods.balanceOf(address).call();
    setBalance(result);
  };

  useEffect(() => {
    fetchBalance();
  }, [contract, address]);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", function () {
        if (!web3) {
          return;
        }
        web3.eth.getAccounts(function (error, accounts) {
          setAddress(accounts[0]);
          web3.eth.defaultAccount = accounts[0];
        });
      });
    }
  }, [web3]);

  const afterRefresh = async(chain:string) =>{
    try {
      const web3 = new Web3(window.ethereum);
      const [accounts] = await web3.eth.getAccounts();
      const chainReal = await web3.eth.getChainId();
      if(((chain === "bsc" && chainReal === chainNumberBsc) || (chain === "kai" && chainReal === chainNumberKai)) && accounts){
        
        setWeb3(web3);
        const [accounts] = await web3.eth.getAccounts();
        web3.eth.defaultAccount = accounts;
        setAddress(accounts);
        setNetWork(chain);
      }
      
    } catch (error:any) {
      if (error.code === 4001) {
        console.log('Please connect to MetaMask.');
      } else {
        console.error(error);
      }
    }


  }



  

  useEffect(() =>{
    const chain = localStorage.getItem("voucher-chain");
    if(chain && window.ethereum){
      afterRefresh(chain);
    }
  },[]);

  const logOut = () =>{
    setWeb3(undefined);
    setAddress("");
    setNetWork("");
    localStorage.removeItem("voucher-chain");
    setIsDisconnect(false);
  }

  return (
    <AuthContext.Provider
      value={{
        balance,
        netWork,
        web3,
        address,
        setNetWork,
        connectMetamask,
        contract,
        adminWallet,
        rateConvert,
        fetchBalance,
        getAdminWallet,
        logOut,
        isDisconnect,
        setIsDisconnect
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
