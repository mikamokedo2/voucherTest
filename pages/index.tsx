import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import style from "../styles/home.module.css";
import { contractAddress, shopdiAbi } from "../constants/const";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useRouter } from "next/router";
import en from "../locales/en";
import vn from "../locales/vn";
import Alert from "../components/Alert";
import Header from "../components/Header";
import { useContractFunction, useEthers } from "@usedapp/core";
import { Contract } from "@ethersproject/contracts";
import Loading from "../components/Loading";
import ErrorPopup from "../components/ErrorPopup";
import Success from "../components/Alert";
import { BigNumber } from "ethers";
import * as yup from "yup";
import { useFormik } from "formik";
import "yup-phone";
import FaqPopup from "../components/FaqPopup";
import {useWeb3} from "../hook/web3";

export const validationPhoneSchema = yup.object({
  phone: yup.string().phone("VN").test(function (value) {
    const { email } = this.parent;
    if (!email) return value != null
    return true
  }),
  email: yup.string().email("Invalid email format")
});

export const serverURL: any =
  process.env.URL_SERVER || "https://api-voucher.shopdi.io";
const decimals = 18;

// export const serverURL = "http://localhost:8000";

const Home: NextPage = () => {
  const formik = useFormik({
    initialValues: {
      phone: "",
      email: "",

    },
    validationSchema: validationPhoneSchema,
    onSubmit: async (value) => {
      onHandleBuying();
    },
  });


  const { account } = useEthers();
  const [valueVoucher, setValueVoucher] = useState(1000);
  const [rateConvert, setRateConvert] = useState(1);
  const [openedPaying, setOpenedPayingPopup] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [dataQRCode, setDataQRCode] = useState("");
  const [agree, setAgree] = useState(true);
  const [faq, setFaq] = useState(false);
  const [count, setCount] = useState(1);
  const [adminWallet, setAdminWallet] = useState("");
  const [err, setErr] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : vn;
  const isConnected = account !== undefined;
  const [contract, setContract] = useState<Contract>();
  const { state, send } = useContractFunction(contract, "approve", {
    transactionName: "approve",
  });

  const {connectMetamask} = useWeb3()
  useEffect(() => {
    const approveSuccess = async () => {
      setOpenedPayingPopup(true);
      try {
        const getToken = executeRecaptcha as any;
        const captcha = await getToken("signup");
        const { data } = await axios.post(`${serverURL}/order`, {
          user: account,
          amount: BigNumber.from(valueVoucher * rateConvert).mul(BigNumber.from(10).pow(decimals)).toString(),
          value: valueVoucher,
          emailorphone: formik.values.phone ?? formik.values.email,
          txt: state.transaction?.hash,
          captcha
        });
        if (data.success) {
          console.log(data);
          setIsPaid(true);
          setDataQRCode(data.data.code);
        } else {
          setErr(true);
        }
        setOpenedPayingPopup(false);
      } catch (error) {
        console.log(error);
        setErr(true);
        setOpenedPayingPopup(false);
      }
    };

    if (state.status === "Success") {
      approveSuccess();
    }
    if (state.status === "Exception") {
      toast.error(state?.errorMessage);
    }
  }, [state]);

  const onHandleBuying = async () => {
    try {
      await send(
        adminWallet,
        BigNumber.from(valueVoucher * rateConvert).mul(BigNumber.from(10).pow(decimals)).toString()
      );
    } catch (error: any) {
      toast.error(error?.errorMessage);
    }
  };

  useEffect(() => {
    const getAdminWallet = async () => {
      try {
        const { data } = await axios.get(`${serverURL}/adminWalletAddress`);
        if (data.success) {
          setAdminWallet(data.data.wallet);
          setRateConvert(data.data.rate);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAdminWallet();
  }, []);

  const increment = async () => {
    let num = count + 1;
    setCount(num);
    setValueVoucher(1000 * num);
  };
  const decrement = async () => {
    let num = count - 1;
    if (count > 0) {
      setCount(num);
      setValueVoucher(1000 * num);
    }
  };
  useEffect(() => {
    const _contract = new Contract(contractAddress, shopdiAbi);
    setContract(_contract);
  }, []);

  return (
    <div className={style.root}>
      <Header />
      <div className={`content p-[16px] ${isConnected ? "hidden" : "block"}`}>
        <img src="/money.png" alt="" />
        <h1 className="title_name">{t.buyVoucher}</h1>
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
      <main className={`p-[16px] ${!isConnected ? "hidden" : "mainContent"}`}>
        <div className="main_top flex">
          <img src="/money.png" alt="" />
        </div>

        <section className="main__mid">
          <section className={style["section-buyer"]}>
            <span className={style["buyer-name-val"]}>{t.amountVoucher}</span>

            <div className="box_input d-flex justify-between transparent">
              <div className={style["box-value"]}> 1.000 {t.coin} </div>
              <div className="coudown">
                <span onClick={decrement}>-</span>
                <span className="count">{count}</span>
                <span onClick={increment}>+</span>
              </div>
            </div>

            <div className="allVoucher">
              <p>{t.totalCoin} :</p>
              <p className="moneyVoucher">{valueVoucher} {t.coin}</p>
            </div>
            <div className={style["title-price"]}>Payment Wallet</div>
            <h1 className={style["token-id"]}>
              {valueVoucher * rateConvert} SHOD
            </h1>
            <div className="hr"></div>
            <div className="buyer__item">
              <div className={style["buyer-name-val"]}>
                {t.phoneNumber} :
              </div>
              <input
                className={`${style["contact-input"]} ${formik.touched.phone && Boolean(formik.errors.phone) && "border border-red-500 border-solid"}`}
                type="text"
                value={formik.values.phone}
                name="phone"
                placeholder={t.phoneNumber}
                onChange={formik.handleChange}
              ></input>
            </div>
            <div className="buyer__item">
              <div className={style["buyer-name-val"]}>
               Email :
              </div>
              <input
                className={`${style["contact-input"]} ${formik.touched.email && Boolean(formik.errors.email) && "border border-red-500 border-solid"}`}
                type="text"
                value={formik.values.email}
                placeholder="Email"
                onChange={formik.handleChange}
                name="email"
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
                {t.agree}&nbsp;
                <span className={`${style["color-primary"]} cursor-pointer`} onClick={() => setFaq(true)}>
                  {t.condition}
                </span>
              </span>
              <button
                disabled={!agree || state.status === "Mining"}
                onClick={() => formik.handleSubmit()}
                className={style["button-buy"]}
              >
                {t.buy}
              </button>
            </div>
          </section>
        </section>
      </main>
      {/* ----------------------Thông báo---------------------------  */}
      {/* <Alert isPaid={isPaid} err={err} ethercanLink={ethercanLink} /> */}
      {(openedPaying || state.status === "Mining") && <Loading />}
      {(err || state.status === "Fail") && (
        <ErrorPopup onClose={() => setErr(false)} />
      )}
      {isPaid && dataQRCode && (
        <Success
          dataQRCode={dataQRCode}
          onClosed={() => {
            setDataQRCode("");
            setIsPaid(false);
          }}
        />
      )}
      {faq &&   <FaqPopup onClose={() => setFaq(false)} />}
    
    </div>
  );
};

export default Home;
