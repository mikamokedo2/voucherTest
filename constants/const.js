import usdc from "./Usdc.json";

  export const serverURL =
    process.env.URL_SERVER || "https://api.digitalvoucher.io";
  // export const serverURL = "http://localhost:8000";
  

export const contractAddress = "0xA6D662dDB759F2A3C4240bca2e1cc86D383F9E71";
export const shopdiAbi = [
  {
    type: "constructor",
    stateMutability: "nonpayable",
    inputs: [
      { type: "address", name: "_TokenStrategy", internalType: "address" },
      { type: "address", name: "_gnosisSafeWallet", internalType: "address" },
      { type: "string", name: "__name", internalType: "string" },
      { type: "string", name: "__symbol", internalType: "string" },
      { type: "uint256", name: "_maxSupply", internalType: "uint256" },
      { type: "uint256", name: "_mintPercent", internalType: "uint256" },
      { type: "uint256", name: "_maxBurn", internalType: "uint256" },
    ],
  },
  {
    type: "event",
    name: "Approval",
    inputs: [
      {
        type: "address",
        name: "owner",
        internalType: "address",
        indexed: true,
      },
      {
        type: "address",
        name: "spender",
        internalType: "address",
        indexed: true,
      },
      {
        type: "uint256",
        name: "value",
        internalType: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ExcludedFromAntiWhale",
    inputs: [
      {
        type: "address",
        name: "_account",
        internalType: "address",
        indexed: false,
      },
      { type: "bool", name: "_excluded", internalType: "bool", indexed: false },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ExcludedFromTax",
    inputs: [
      {
        type: "address",
        name: "_account",
        internalType: "address",
        indexed: false,
      },
      { type: "bool", name: "_excluded", internalType: "bool", indexed: false },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "InCaseTokensGetStuck",
    inputs: [
      {
        type: "address",
        name: "_token",
        internalType: "contract IERC20",
        indexed: false,
      },
      {
        type: "uint256",
        name: "_amount",
        internalType: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MaxTransferAmountRateUpdated",
    inputs: [
      {
        type: "address",
        name: "operator",
        internalType: "address",
        indexed: true,
      },
      {
        type: "uint256",
        name: "previousRate",
        internalType: "uint256",
        indexed: false,
      },
      {
        type: "uint256",
        name: "newRate",
        internalType: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        type: "address",
        name: "previousOwner",
        internalType: "address",
        indexed: true,
      },
      {
        type: "address",
        name: "newOwner",
        internalType: "address",
        indexed: true,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SetTokenStrategy",
    inputs: [
      { type: "address", name: "_by", internalType: "address", indexed: false },
      {
        type: "address",
        name: "_TokenStrategy",
        internalType: "address",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Transfer",
    inputs: [
      { type: "address", name: "from", internalType: "address", indexed: true },
      { type: "address", name: "to", internalType: "address", indexed: true },
      {
        type: "uint256",
        name: "value",
        internalType: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TransferTaxRateUpdated",
    inputs: [
      {
        type: "address",
        name: "operator",
        internalType: "address",
        indexed: true,
      },
      {
        type: "uint256",
        name: "previousRate",
        internalType: "uint256",
        indexed: false,
      },
      {
        type: "uint256",
        name: "newRate",
        internalType: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "BURN_ADDRESS",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint16", name: "", internalType: "uint16" }],
    name: "MAXIMUM_TRANSFER_TAX_RATE",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "MAX_BURN",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "MAX_SUPPLY",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "TokenStrategy",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "bool", name: "", internalType: "bool" }],
    name: "_excludedFromAntiWhale",
    inputs: [{ type: "address", name: "", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "bool", name: "", internalType: "bool" }],
    name: "_excludedFromTax",
    inputs: [{ type: "address", name: "", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "allowance",
    inputs: [
      { type: "address", name: "owner", internalType: "address" },
      { type: "address", name: "spender", internalType: "address" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [{ type: "bool", name: "", internalType: "bool" }],
    name: "approve",
    inputs: [
      { type: "address", name: "spender", internalType: "address" },
      { type: "uint256", name: "amount", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "balanceOf",
    inputs: [{ type: "address", name: "account", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint8", name: "", internalType: "uint8" }],
    name: "decimals",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [{ type: "bool", name: "", internalType: "bool" }],
    name: "decreaseAllowance",
    inputs: [
      { type: "address", name: "spender", internalType: "address" },
      { type: "uint256", name: "subtractedValue", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "gnosisSafeWallet",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "inCaseTokensGetStuck",
    inputs: [
      { type: "address", name: "_token", internalType: "contract IERC20" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [{ type: "bool", name: "", internalType: "bool" }],
    name: "increaseAllowance",
    inputs: [
      { type: "address", name: "spender", internalType: "address" },
      { type: "uint256", name: "addedValue", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "maxTransferAmount",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint16", name: "", internalType: "uint16" }],
    name: "maxTransferAmountRate",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [{ type: "bool", name: "", internalType: "bool" }],
    name: "mint",
    inputs: [{ type: "uint256", name: "amount", internalType: "uint256" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "string", name: "", internalType: "string" }],
    name: "name",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "owner",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "renounceOwnership",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setExcludedFromAntiWhale",
    inputs: [
      { type: "address", name: "_account", internalType: "address" },
      { type: "bool", name: "_excluded", internalType: "bool" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setExcludedFromTax",
    inputs: [
      { type: "address", name: "_account", internalType: "address" },
      { type: "bool", name: "_excluded", internalType: "bool" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setTokenStrategy",
    inputs: [
      { type: "address", name: "_TokenStrategy", internalType: "address" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "string", name: "", internalType: "string" }],
    name: "symbol",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "taxBaseOnAmount",
    inputs: [
      { type: "uint256", name: "_transferAmount", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "totalSupply",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [{ type: "bool", name: "", internalType: "bool" }],
    name: "transfer",
    inputs: [
      { type: "address", name: "to", internalType: "address" },
      { type: "uint256", name: "amount", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [{ type: "bool", name: "", internalType: "bool" }],
    name: "transferFrom",
    inputs: [
      { type: "address", name: "from", internalType: "address" },
      { type: "address", name: "to", internalType: "address" },
      { type: "uint256", name: "amount", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "transferOwnership",
    inputs: [{ type: "address", name: "newOwner", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint16", name: "", internalType: "uint16" }],
    name: "transferTaxRate",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "updateMaxTransferAmountRate",
    inputs: [
      {
        type: "uint16",
        name: "_maxTransferAmountRate",
        internalType: "uint16",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "updateTransferTaxRate",
    inputs: [
      { type: "uint16", name: "_transferTaxRate", internalType: "uint16" },
    ],
  },
];
