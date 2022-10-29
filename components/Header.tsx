import React, { useEffect, useState } from "react";
import SelectLanguage from "./SelectLanguage";
import WalletPopup from "./WalletPopup";
import { useRouter } from "next/router";
import en from "../locales/en";
import vn from "../locales/vn";
import { useWeb3 } from "../hook/web3";
import Web3 from "web3";
import BigNumber from "bignumber.js";

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

  const { connectMetamask, address, setNetWork, balance } = useWeb3();
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
      <WalletPopup
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
      />
      <div className="d-flex align-items-center justify-between ">
        <SelectLanguage />
        {isConnected ? (
          <div className="flex">
            <div className="seclecBox_item mr-[10px]">
              {new BigNumber(
                new BigNumber(balance ?? 0)
                  .dividedBy(new BigNumber(10).pow(18))
                  .toFixed(0, 1)
              ).toNumber()}
              &nbsp;SHOD
            </div>

            <div
              className="right"
              onMouseEnter={handleHover}
              onMouseLeave={handleLeaveHover}
            >
              <div className="seclecBox_item">
                <span className="uppercase">{`${address.slice(
                  0,
                  4
                )}...${address.slice(
                  address.length - 4,
                  address.length
                )}`}</span>
              </div>
              <div className={` sub_menu ${isActive ? "active" : ""}`}>
                <ul>
                  <li onClick={() => router.push("/support")}>
                    {t.contactHelp}
                  </li>
                  <li onClick={() => router.push("/faq")}>FAQs</li>
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
                  }}
                >
                  BSC chain
                </li>
                <li
                  onClick={() => {
                    setOpened(true);
                    setNetWork && setNetWork("kai");
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
