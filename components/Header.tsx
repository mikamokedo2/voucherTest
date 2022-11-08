import React, { useEffect, useState } from "react";
import SelectLanguage from "./SelectLanguage";
import WalletPopup from "./WalletPopup";
import { useRouter } from "next/router";
import en from "../locales/en";
import vn from "../locales/vn";
import { useWeb3 } from "../hook/web3";
import Web3 from "web3";
import BigNumber from "bignumber.js";
import { DownOutlined } from "@ant-design/icons";

const Header = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : vn;
  const [isActive, setIsActive] = useState(false);
  const [walletSelect, setWalletSelect] = useState({
    name: "Metamask",
    src: "/assets/images/metamask.png",
    options: {},
    popular: true,
  });

  const { connectMetamask, address, setNetWork, balance, logOut } = useWeb3();
  const [opened, setOpened] = useState(false);
  const isConnected = address !== "";
  const handleHover = async () => {
    setIsActive(true);
  };
  const handleLeaveHover = async () => {
    setIsActive(false);
  };

  return (
    <section className="seclecBox container mx-auto">
      {/* <WalletPopup
        onHandleConnectWallet={() => {
          connectMetamask && connectMetamask();
          setOpened(false);
        }}
        onSelectWallet={(connection) => {
          setWalletSelect(connection);
        }}
        onClose={() => setOpened(false)}
        walletSelect={walletSelect}
        opened={opened}
      /> */}
      <div className="d-flex align-items-center justify-between ">
        <SelectLanguage />
        <div className="logo-head">
          <a href="/">
            <img src="/assets/images/logo-header.png" />
          </a>
        </div>
        {isConnected ? (
          <div className="flex items-center">
            <div className="mr-[10px] number-coin text-[#ACD9EE] flex items-center">
              <div className="mr-[8px]">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.48535 21.2832H21.5059C23.4131 21.2832 24.3975 20.29 24.3975 18.4092V8.91699C24.3975 7.03613 23.4131 6.05176 21.5059 6.05176H6.48535C4.58691 6.05176 3.59375 7.03613 3.59375 8.91699V18.4092C3.59375 20.2988 4.58691 21.2832 6.48535 21.2832ZM5.34277 9.0752C5.34277 8.23145 5.79102 7.80957 6.59961 7.80957H21.3916C22.2002 7.80957 22.6484 8.23145 22.6484 9.0752V9.70801H5.34277V9.0752ZM6.59961 19.5254C5.79102 19.5254 5.34277 19.1035 5.34277 18.2598V11.7734H22.6484V18.2598C22.6484 19.1035 22.2002 19.5254 21.3916 19.5254H6.59961ZM7.79492 17.9346H9.94824C10.4668 17.9346 10.8184 17.5918 10.8184 17.0996V15.4648C10.8184 14.9727 10.4668 14.6299 9.94824 14.6299H7.79492C7.28516 14.6299 6.93359 14.9727 6.93359 15.4648V17.0996C6.93359 17.5918 7.28516 17.9346 7.79492 17.9346Z"
                    fill="#ACD9EE"
                  />
                </svg>
              </div>
             <div>
             {new BigNumber(
                new BigNumber(balance ?? 0)
                  .dividedBy(new BigNumber(10).pow(18))
                  .toFixed(0, 1)
              ).toNumber()}
              &nbsp;SHOD
              </div>
            </div>

            <div
              className="right"
              onMouseEnter={handleHover}
              onMouseLeave={handleLeaveHover}
            >
              {address && (
                <div className="seclecBox_item">
                  <span className="uppercase">{`${address.slice(
                    0,
                    4
                  )}...${address.slice(
                    address.length - 4,
                    address.length
                  )}`}</span>
                  <DownOutlined />
                </div>
              )}

              <div className={` sub_menu ${isActive ? "active" : ""}`}>
                <ul>
                  <li onClick={() => router.push("/support")}>
                    {t.contactHelp}
                  </li>
                  <li onClick={() => router.push("/faq")} className="mt-[10px]">
                    FAQs
                  </li>
                  <li onClick={logOut}>{t.disconnect}</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="right"
            onMouseEnter={handleHover}
            onMouseLeave={handleLeaveHover}
          >
            <div className="seclecBox_item">
              <span className="uppercase">{t.connectWallet}</span>
            </div>
            <div className={` sub_menu ${isActive ? "active" : ""}`}>
              <ul>
                <li
                  onClick={() => {
                    setOpened(true);
                    setNetWork && setNetWork("bsc");
                    connectMetamask && connectMetamask("bsc");
                  }}
                >
                  BSC chain
                </li>
                <li
                  onClick={() => {
                    setOpened(true);
                    setNetWork && setNetWork("kai");
                    connectMetamask && connectMetamask("kai");
                  }}
                >
                  KAI chain
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Header;
