import { useEthers } from "@usedapp/core";
import React, { useEffect, useState } from "react";
import SelectLanguage from "./SelectLanguage";
import WalletPopup from "./WalletPopup";
import { useRouter } from "next/router";
import en from "../locales/en";
import vn from "../locales/vn";

const Header = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : vn;
  const [isActive, setIsActive] = useState(false);
  const { activateBrowserWallet, account, deactivate } = useEthers();
  const [walletSelect, setWalletSelect] = useState({
    name: "Metamask",
    src: "/metamask.png",
    options: {},
    popular: true,
  });
  const [opened, setOpened] = useState(false);
  const isConnected = account !== undefined;
  const handleHover = async () => {
    setIsActive(true);
  };
  const handleLeaveHover = async () => {
    setIsActive(false);
  };


  return (
    <section className="seclecBox">
      <WalletPopup
        onHandleConnectWallet={() => {activateBrowserWallet();setOpened(false)}}
        onSelectWallet={(connection) => {
          setWalletSelect(connection);
        }}
        onClose={() => setOpened(false)}
        walletSelect={walletSelect}
        opened={opened}
      />
      <div className="d-flex align-items-center  justify-between ">
        <SelectLanguage />
        {isConnected ? (
          <div
            className="right"
            onMouseEnter={handleHover}
            onMouseLeave={handleLeaveHover}
          >
            <div className="seclecBox_item">
              <span className="uppercase">{`${account.slice(
                0,
                4
              )}...${account.slice(account.length - 4, account.length)}`}</span>
            </div>
            <div className={` sub_menu ${isActive ? "active" : ""}`}>
              <ul>
                <li onClick={() => router.push("/support")}>{t.contactHelp}</li>
                <li onClick={deactivate}>{t.disconnect}</li>
              </ul>
            </div>
          </div>
        ) : (
          <div onClick={() => setOpened(true)} className="seclecBox_item">
            <span className="uppercase">{t.connectWallet}</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default Header;
