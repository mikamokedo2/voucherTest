import React, { RefObject, useRef } from "react";
import style from "../styles/home.module.css";
import { useRouter } from "next/router";
import en from "../locales/en";
import vn from "../locales/vn";

const connectionWallet = [
  {
    name: "Metamask",
    src: "/metamask.png",
    options: {},
    popular: true,
    disabled:false
  },
  {
    name: "WalletConnect",
    src: "/wallconnect1.png",
    options: {},
    popular: true,
    disabled:true
  },
  {
    name: "Binance Chain Wallet",
    src: "/binaneChain.png",
    options: {},
    popular: true,
    disabled:true
  },
  {
    name: "TrustWallet",
    src: "/trustwallet.png",
    options: {},
    popular: true,
    disabled:true
  },
  {
    name: "Math Wallet",
    src: "/math.png",
    options: {},
    popular: true,
    disabled:true
  },
  {
    name: "TokenPocket",
    src: "/token.png",
    options: {},
    popular: true,
    disabled:true
  },
  {
    name: "SafePal Wallet",
    src: "/safepal.png",
    options: {},
    popular: true,
    disabled:true
  },
];

interface WalletPopupProps {
  onHandleConnectWallet: () => void;
  onSelectWallet: (connection:any) => void;
  onClose: () => void;
  walletSelect:any;
  opened:boolean;
}
const WalletPopup: React.FC<WalletPopupProps> = ({
  onHandleConnectWallet,
  onSelectWallet,
  onClose,
  walletSelect,
  opened
}) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : vn;
  
  return (
    <div
      className={`fixed w-[100vw] h-[100vh] bg-[black] bg-opacity-40 popupWallet ${!opened ? "hidden" : "" }`}
    >
      <div className={style["popup-connect"]}>
        <img
          onClick={onClose}
          className={style["img-close"]}
          src="/multiply.png"
        />
        <p className={style.titleConnect}>{t.connectOneWallet}</p>
        <div className={"flex flex-col"}>
          {connectionWallet.map((connection) => (
            <div
              key={connection.name}
              onClick={() => onSelectWallet(connection)}
              className={`${connection.disabled ? "pointer-events-none opacity-50" : "pointer-events-auto"} wallet__item flex flex-row cursor-pointer justify-between border-[1px] items-center mx-[32px] py-[12px] px-[11px] border-solid border-wid border-[#E0E0E0] ${
                (walletSelect as any).name === connection.name ? "active" : ""
              }`}
            >
              <div className="flex flex-row gap-2 items-center justify-between   w-100">
                <span className={style.connect_name}>{connection.name}</span>
                <img src={connection.src} />
              </div>
              <div></div>
            </div>
          ))}
        </div>
        <div className=" ">
          <button
            onClick={onHandleConnectWallet}
            className={style["button-connect-wallet"]}
          >
            {t.selectWallet}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletPopup;
