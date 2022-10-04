import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import style from "./home.module.css";
import Web3 from "web3";
import {
  shopdiAbi,
  contractAddress,
  contractAbiToken,
  contractAddressToken,
} from "../constants/const";
import socketIOClient from "socket.io-client";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useRouter } from "next/router";
import en from "../locales/en";
import vn from "../locales/vn";
import { error } from "console";

function numberWithCommas(x: any) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function removeNumberWithCommas(x: any) {
  return x.replaceAll(".", "");
}

const connectionWallet = [
  {
    name: "Metamask",
    src: "/metamask.png",
    options: {},
    popular: true,
  },
  {
    name: "WalletConnect",
    src: "/wallconnect1.png",
    options: {},
    popular: true,
  },
  {
    name: "Binance Chain Wallet",
    src: "/binaneChain.png",
    options: {},
    popular: true,
  },
  {
    name: "TrustWallet",
    src: "/trustwallet.png",
    options: {},
    popular: true,
  },
  {
    name: "Math Wallet",
    src: "/math.png",
    options: {},
    popular: true,
  },
  {
    name: "TokenPocket",
    src: "/token.png",
    options: {},
    popular: true,
  },
  {
    name: "SafePal Wallet",
    src: "/safepal.png",
    options: {},
    popular: true,
  },
];

const vouchersData = [
  {
    id: "ABCDEF",
    price: 1000000,
    displayPrice: numberWithCommas(1000000),
  },
  {
    id: "FBCDEF",
    price: 3000000,
    displayPrice: numberWithCommas(3000000),
  },
  {
    id: "YYCDEF",
    price: 5000000,
    displayPrice: numberWithCommas(5000000),
  },
  {
    id: "AFADEF",
    price: 15000000,
    displayPrice: numberWithCommas(15000000),
  },
  {
    id: "ABLKEF",
    price: 20000000,
    displayPrice: numberWithCommas(20000000),
  },
  {
    id: "ABCEEEF",
    price: 25000000,
    displayPrice: numberWithCommas(25000000),
  },
];

const serverURL: any =
  process.env.URL_SERVER || "https://0b12-115-79-51-193.ap.ngrok.io";
const socketURL: any =
  process.env.URL_SERVER || "https://0b12-115-79-51-193.ap.ngrok.io";

console.log(serverURL, socketURL);

const Home: NextPage = () => {
  const [vouchers, setVouchers] = useState(vouchersData);
  const [selectVoucher, setSelectVoucher] = useState("");
  const [valueVoucher, setValueVoucher] = useState(1000);
  const [usdc, setUsdc] = useState(0);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [opened, setOpened] = useState(false);
  const popConnectRef = useRef<HTMLDivElement>();
  const popupPaymentLoadingRef = useRef<HTMLDivElement>();
  const [currentAccount, setCurrentAccount] = useState("");
  const [openedPaying, setOpenedPayingPopup] = useState(false);
  const [isPaying, setPaying] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [balance, setBalance] = useState("");
  const [ethercanLink, setEtherscanLink] = useState("");
  const [walletSelect, setWalletSelect] = useState({});
  const [rateVnd, setRateVnd] = useState(0);
  const [dataQRCode, setDataQRCode] = useState("");
  const [displayInput, setDisplayInput] = useState("0");
  const [agree, setAgree] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [count, setCount] = useState(1);
  const [contactSp, setContactSp] = useState(false);
  const [contractToken, setContractToken] = useState(null);
  const [popupLd, setPopupLd] = useState(false);
  const [nameWallet, setNameWallet] = useState(" CONNECT WALLET");
  const [isActive, setIsActive] = useState(false);
  const [err, setErr] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const router = useRouter();
  const { locale } = router;
  console.log(locale);
  const t = locale === "en" ? en : vn;

  const reset = () => {
    setSelectVoucher("");
    setValueVoucher(1000);
    setUsdc(0);
    setEmail("");
    setOpened(false);
    setOpenedPayingPopup(false);
    setPaying(false);
    setIsPaid(false);
    setEtherscanLink("");
    setDataQRCode("");
    setDisplayInput("0");
  };

  const convertVNDToSHOD = (vnd: number) => {
    return Number((vnd / rateVnd).toFixed(3));
  };

  const connectMetamask = async () => {
    const { ethereum: provider } = window as any;

    if (typeof provider !== "undefined") {
      provider
        .request({ method: "eth_requestAccounts" })
        .then((accounts: any) => {
          const [account] = accounts;
          setCurrentAccount(account);
          setOpened(false);
        })
        .catch((err: any) => console.error(err));
    } else {
      // alert("Please install metamask.");
    }
  };

  useEffect(() => {
    const socket = socketIOClient(socketURL);

    socket.on("payment-success", (data) => {
      const { user } = data;
      if (user === currentAccount) {
        console.log("already paid");
        setPaying(false);
        setIsPaid(true);
        setDataQRCode(JSON.stringify(data.data));
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [currentAccount]);

  async function verifyCaptcha() {
    const getToken = executeRecaptcha as any;
    const captcha = await getToken("signup");

    const { data } = await axios.post(`${serverURL}/captcha`, { captcha });
    return data;
  }

  useEffect(() => {
    (async () => {
      const { ethereum } = window as any;

      if (!ethereum) {
        // alert("Please install metamask");
        return;
      }

      const web3: any = new Web3(ethereum);
      const contract: any = new web3.eth.Contract(shopdiAbi, contractAddress);
      const contractToken: any = new web3.eth.Contract(
        contractAbiToken,
        contractAddressToken
      );
      setWeb3(web3);
      setContract(contract);
      setContractToken(contractToken);

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts && accounts.length) {
        setCurrentAccount(accounts[0]);
      }
    })();
  }, []);

  const signatureContract = async (params: any) => {
    const { data } = await axios.post(`${serverURL}/order`, params);
    return data;
  };

  const buyToken = async () => {
    if (!email && !phone) {
      alert("Please input your Email or Phone ");
      return;
    }

    if (!usdc) {
      alert("Please input your value voucher");
      return;
    }

    const { success: isVerify, message } = await verifyCaptcha();

    if (!isVerify) {
      alert(message);
      return;
    }

    setOpenedPayingPopup(true);
    setPopupLd(true);
    setPaying(true);

    const ct = contract as any;
    const ctToken = contractToken as any;
    const coin = Number(usdc) * 1000000000000000000;

    const { signature, data }: any = await signatureContract({
      user: currentAccount,
      amount: coin,
      value: valueVoucher,
      email: email,
      phone: phone,
    });

    const { v, r, s }: any = signature;
    const { id, amount } = data;

    const success = await ct.methods
      .permit(currentAccount, id, amount, v, r, s)
      .call();
    if (success) {
      await ctToken.methods
        .approve(contractAddress, amount.toString())
        .send({ from: currentAccount });

      await ct.methods
        .buy(id, amount.toString(), v, r, s)
        .send({ from: currentAccount });
      await setIsPaid(true);
      console.log("scu");
    } else {
      await setErr(true);
      console.log("Lỗi thanh toán");
    }
  };

  useEffect(() => {
    const { ethereum } = window as any;

    if (!ethereum) {
      // alert("Please install metamask.");
      return;
    }

    ethereum.on("accountsChanged", function (accounts: any) {
      const [account] = accounts;
      setCurrentAccount(account);
    });
  }, []);

  useEffect(() => {
    async function fetchRateVND() {
      setRateVnd(10000);
    }

    fetchRateVND();
  }, []);

  const onClickVoucher = (voucher: any) => {
    setSelectVoucher(voucher.id);
    setValueVoucher(voucher.price);
    setDisplayInput(voucher.displayPrice);
    setUsdc(convertVNDToSHOD(voucher.price));
  };

  const showHideConnectionPopup = (ref: any, opened = false) => {
    const node = ref.current;
    if (opened) {
      if (node) {
        node.style.display = "block";
      }
    } else {
      if (node) {
        node.style.display = "none";
      }
    }
  };

  const onHandleConnectWallet = async () => {
    try {
      connectMetamask();
      await setNameWallet("Master Wallet");
    } catch (error) {
      console.error(error);
    }
  };

  const onHandleBuying = async () => {
    if (!currentAccount) {
      setOpened(true);
      return;
    }

    await buyToken();
    console.log("Buyingggg voucher");
  };

  const notify = (message: any) => toast(message);

  useEffect(() => {
    showHideConnectionPopup(popupPaymentLoadingRef, openedPaying);
  }, [openedPaying]);

  useEffect(() => {
    showHideConnectionPopup(popConnectRef, opened);
  }, [opened]);

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const locale = e.target.value;
    router.push(router.pathname, router.asPath, { locale });
    localStorage.setItem("locale", locale === "en" ? "en" : "vi");
  };
  const changeWallet = () => {
    setOpened(true);
    setIsConnected(true);
  };
  const increment = async () => {
    let num = count + 1;
    await setCount(num);
    await console.log(count);
    await setValueVoucher(1000 * num);
  };
  const decrement = async () => {
    let num = count - 1;
    if (count > 0) {
      await setCount(num);
      await console.log(count);
      await setValueVoucher(1000 * num);
    }
  };
  const handleHover = async () => {
    setIsActive(true);
  };
  const handleLeaveHover = async () => {
    setIsActive(false);
  };
  const handleSp = () => {
    // setPopupLd(true);
  };
  return (
    <div className={style.root}>
      <ToastContainer />
      <div
        ref={popConnectRef as any}
        className="fixed hidden w-[100vw] h-[100vh] bg-[black] bg-opacity-40 popupWallet"
      >
        <div className={style["popup-connect"]}>
          <img
            onClick={() => setOpened(false)}
            className={style["img-close"]}
            src="/multiply.png"
          />
          <p className={style.titleConnect}>Connect one of wallet</p>
          <div className={"flex flex-col"}>
            {connectionWallet.map((connection) => (
              <div
                key={connection.name}
                onClick={() => {
                  setWalletSelect(connection);
                  setIsConnected(true);
                }}
                className={`wallet__item flex flex-row cursor-pointer justify-between border-[1px] items-center mx-[32px] py-[12px] px-[11px] border-solid border-wid border-[#E0E0E0] ${(walletSelect as any).name === connection.name ? "active" : ""
                  }`}
              >
                <div className="flex flex-row gap-2 items-center justify-between   w-100">
                  <span className={style.connect_name}>{connection.name}</span>
                  <img src={connection.src} />
                </div>
                <div></div>
              </div>
            ))}
            {/* <div className=" bg-[#fff] cursor-pointer border-[1px] border-solid border-[#a3a3a3] mx-[9px] py-[12px] px-[11px] flex justify-center items-center">
              <button className="text-center font-semibold text-[16px] text-[#858585]">
                View More
              </button>
            </div> */}
          </div>
          <div className=" ">
            <button
              onClick={() => onHandleConnectWallet()}
              className={style["button-connect-wallet"]}
            >
              Select Wallet
            </button>
          </div>
        </div>
      </div>
      <section className="seclecBox">
        <div className="d-flex align-items-center  justify-between ">
          {/* <div className="body-04 mr-2">{t.selectLanguage}</div> */}
          <select
            onChange={changeLanguage}
            defaultValue={locale}
            id="gender"
            className="seclecBox_item"
          >
            <option className="body-04" value="vn">
              🇻🇳  VIE
            </option>
            <option className="body-04" value="en">
              🇺🇸  ENG
            </option>
          </select>
          <div
            className="right"
            onMouseEnter={handleHover}
            onMouseLeave={handleLeaveHover}
          >
            <div onClick={changeWallet} className="seclecBox_item">
              <span>{nameWallet}</span>
            </div>
            <div className={` sub_menu ${isActive ? "active" : ""}`}>
              <ul>
                <li onClick={handleSp}>Contact Help</li>
                <li>Log Out</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <div className={`content p-[16px] ${isConnected ? "hidden" : "block"}`}>
        <img src="/money.png" alt="" />
        <h1 className="title_name">Mua Voucher</h1>
        <p>
          Shopdi is an ecommerce platform specializing in high-end products as
          well as limited edition items. Participating in game application
          activities, buyers will have the right to decide to buy trendy
          products at the desired price without affecting the seller's profit.
          Shopdi is an ecommerce platform specializing in high-end products as
          well as limited edition items. Participating in game application
          activities, buyers will have the right to decide to buy trendy
          products at the desired price without affecting the seller's profit.
        </p>
      </div>
      <section
        className={`${isPaid ? "flex" : "hidden"
          } flex-col justify-center gap-[8px] items-center pt-20`}
      >
        <h3 className="text-white font-semibold text-[16px] text-center">
          Số Voucher của bạn :
        </h3>
        <h1 className="text-white text-[28px] font-medium text-center flex flex-row items-center gap-5 justify-center">
          {dataQRCode ? JSON.parse(dataQRCode).code : ""}
          <span style={{ display: "flex", alignItems: "center" }}>
            000 <img src="/doc.png" />
          </span>
        </h1>
        <QRCode value={dataQRCode} level={"H"} />
        {/* <a
          onClick={() => reset()}
          href={ethercanLink}
          target="_blank"
          className={style["button-buy-success"]}
        >
          Back
        </a> */}
      </section>
      <main
        className={` p-[16px] ${isConnected ? "mainContent" : "hidden"} ${popupLd ? "noactive" : ""
          }`}
      >
        <div className={`main_top ${isPaid ? "hidden" : "flex"}`}>
          <img src="/money.png" alt="" />
        </div>

        <section className={`${isPaid ? "hidden" : ""} main__mid`}>
          <section className={style["section-buyer"]}>
            <span className={style["buyer-name-val"]}>Nhập giá trị Vocher</span>

            <div className="box_input d-flex justify-between transparent">
              <div className={style["box-value"]}> 1.000 Xu </div>
              <div className="coudown">
                <span onClick={decrement}>-</span>
                <span className="count">{count}</span>
                <span onClick={increment}>+</span>
              </div>
            </div>

            <div className="allVoucher">
              <p>Tổng số xu :</p>
              <p className="moneyVoucher">{valueVoucher} Xu</p>
            </div>
            <div className={style["title-price"]}>Payment Wallet</div>
            <h1 className={style["token-id"]}>{usdc} SHOD</h1>
            <div className="hr"></div>
            <div className="buyer__item">
              <div className={style["buyer-name-val"]}>
                Gửi Voucher đến số điện thoại :
              </div>
              <input
                className={style["buyer-input"]}
                type="text"
                value={phone}
                placeholder="Số điện thoại"
                onChange={(e) => setPhone(e.target.value || "")}
              ></input>
            </div>
            <div className="buyer__item">
              <div className={style["buyer-name-val"]}>
                Gửi Voucher đến Email :
              </div>
              <input
                className={style["buyer-input"]}
                type="text"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value || "")}
              ></input>
            </div>
            <div className="wrap-fix">

              <span className={style["title-you"]}>
                <input
                  checked={agree}
                  onChange={(e) => {
                    setAgree(e.target.checked);
                  }}
                  type="checkbox"
                />{" "}
                Bạn đồng ý với các <a href="" className={style["color-primary"]}>điều khoản và điều kiện</a>
              </span>
              <button
                disabled={agree ? false : true}
                onClick={() => {
                  onHandleBuying();
                }}
                className={style["button-buy"]}
              >
                Mua
              </button>
            </div>
          </section>
        </section>
      </main>


      {/* ----------------------Thông báo---------------------------  */}
      <div ref={popupPaymentLoadingRef as any} className="popupBuy">
        <div className={`  rounded-[4px] `}>
          <div
            className={`${isPaid ? "hidden" : "flex"
              } px-[8px] flex-row loading`}
          >
            <div className="border-solid border-[1px]   border-[#666666] loading_item ">
              <div className="w-[100%] h-[100%]  flex flex-row items-center justify-center loading_item-box ">
                <span className="text-white font-medium   ">
                  <img src="/loading.png" className="icon_load" />
                </span>
              </div>
            </div>
          </div>
          <div
            className={`${err ? "flex" : "hidden"} px-[8px] flex-row loading`}
          >
            <div className="border-solid border-[1px]   border-[#666666] loading_item ">
              <div className="w-[100%] h-[100%]  flex flex-row items-center justify-center loading_item-box ">
                <span className="text-white font-medium   ">
                  <img src="/err.png" className="icon_load" />
                </span>
              </div>
            </div>
          </div>
          <p className="text-white font-medium text-[500] text-center py-[32px]">
            {isPaid ? "Giao dịch thành công" : "Đang xử lý giao dich"}
            {err ? "Giao dịch thất bại" : ""}
          </p>

          <p
            className={`px-[37px] text-white text-[14px] font-normal text-center mt-[40px] ${isPaid ? "hidden" : "flex"
              }`}
          >
            Vui lòng không tắt khi giao dịch đang hoàn tất. Chúng tôi sẽ gửi
            Voucher đến Email/Phone đến bạn khi giao dịch hoàn tất
          </p>
          <p
            className={`px-[37px] text-white text-[14px] font-normal text-center  border-[#FDD116] ${isPaid ? "flex" : "hidden"
              }`}
          >
            Vui lòng kiểm tra voucher trong email. Mọi thắc mắc vui lòng gọi đến
            1900 3395
          </p>
          <p
            className={`px-[37px] text-white text-[14px] font-normal text-center mt-[40px] ${err ? "flex" : "hidden"
              }`}
          >
            Số voucher hiện tại đã hết vui lòng quay lại sau
          </p>
          <div
            className={`flex flex-col mx-[9px] mt-[60px] gap-[16px] mb-[16px]   ${isPaid ? "flex" : "hidden"
              }`}
          >
            <a
              href={ethercanLink}
              target={"_blank"}
              className={`flex py-[14px] flex-row items-center justify-center rounded-[2px] border-solid border-[1px] ${isPaid
                  ? "border-[#FDD116]    text-[#FDD116] cursor-pointer"
                  : "border-[#FDD116] text-[#FDD116] cursor-none"
                }  font-bold text-[16px] border-[#FDD116]  `}
            >
              Xem Thêm Trên Bsc Scan
            </a>
            <a
              href={ethercanLink}
              target={"_blank"}
              className={`flex py-[14px] flex-row items-center justify-center rounded-[2px] border-solid border-[1px] ${err
                  ? "border-[#FDD116]    text-[#FDD116] cursor-pointer flex"
                  : "border-[#FDD116] text-[#FDD116] cursor-none hidden"
                }  font-bold text-[16px] border-[#FDD116]  `}
            >
              Quay lại home
            </a>
            <a
              href={ethercanLink}
              target={"_blank"}
              className={`flex py-[14px] flex-row items-center justify-center rounded-[2px] border-solid border-[1px] ${isPaid
                  ? "border-black text-black cursor-pointer"
                  : "border-[#858585] text-black cursor-none"
                }  font-bold text-[16px]  btn__main`}
            >
              Sử dụng trên shopdi app
            </a>
            {/* <button
              onClick={() => setOpenedPayingPopup(false)}
              className={`${
                isPaid ? "bg-[#FDD116] text-black" : "bg-[#858585] text-white"
              } flex py-[14px] flex-row items-center justify-center rounded-[2px] font-bold text-[16px]`}
            >
              Hoàn Tất
            </button> */}
          </div>
        </div>
      </div>



      {/* ----------------------Support------------------------------ */}
      <div className={` contact__suport ${contactSp ? "block" : "hidden"}`}>
        <img src="./mail.png" alt="" />
        <p className="text-white">Hỗ trợ</p>
        <div className="contact__item">
          <div className="">Số điện thoại:</div>
          <input
            className={style["contact-input"]}
            type="text"
            value={phone}
            placeholder="Số điện thoại"
            onChange={(e) => setPhone(e.target.value || "")}
          ></input>
        </div>
        <div className="contact__item">
          <div className="">Email :</div>
          <input
            className={style["contact-input"]}
            type="text"
            value={phone}
            placeholder="Số điện thoại"
            onChange={(e) => setPhone(e.target.value || "")}
          ></input>
        </div>
        <div className="contact__item">
          <div className="">Địa chỉ ví :</div>
          <input
            className={style["contact-input"]}
            type="text"
            value={phone}
            placeholder="Số điện thoại"
            onChange={(e) => setPhone(e.target.value || "")}
          ></input>
        </div>
        <div className="contact__item">
          <div className="">Mô tả vấn đề cần hỗ trợ :</div>
          <input
            className={style["contact-input"]}
            type="text"
            value={phone}
            placeholder="Số điện thoại"
            onChange={(e) => setPhone(e.target.value || "")}
          ></input>
        </div>
        <button className="btn__main">Gửi</button>
      </div>

    </div>
  );
};

export default Home;


let Waiting = () => {
  return (
    <>

    </>
  )
};
