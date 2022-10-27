import { shopdiAbi } from "../constants/const";
import { AbiItem }   from 'web3-utils';
import Web3 from "web3";
import { Contract } from "web3-eth-contract";



 const ShodiContract = (web3:Web3,contractAddress:string):Contract => new web3.eth.Contract(shopdiAbi as AbiItem[] ,contractAddress);
 export default ShodiContract;
