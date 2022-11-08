import React, { useEffect, useState,useMemo } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import en from "../locales/en";
import vn from "../locales/vn";
import { useWeb3 } from "../hook/web3";
import style from "../styles/home.module.css";
import axios from "axios";
import { BigNumber } from "bignumber.js";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { serverURL } from "../constants/const";
import { message } from "antd";



const decimals = 18;

interface BuyProps {
  setFaq: () => void;
  setOpenedPayingPopup: (state: boolean) => void;
  setErr: (state: boolean) => void;
  setIsPaid: (state: boolean) => void;
  setDataQRCode: (state: string) => void;
  isShow: boolean;
}

const convertVoucherToShod = (amount: number, rate: number) => {
  return (amount / rate).toFixed(18);
};

const Buy: React.FC<BuyProps> = ({
  setFaq,
  setOpenedPayingPopup,
  setErr,
  setIsPaid,
  setDataQRCode,
  isShow,
}) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [count, setCount] = useState(1);
  const router = useRouter();
  const [valueVoucher, setValueVoucher] = useState(1000);
  const { locale } = router;
  const t = locale === "en" ? en : vn;
  const {
    address,
    contract,
    netWork,
    adminWallet,
    rateConvert,
    getAdminWallet,
    wrongChain
  } = useWeb3();
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

  const validationPhoneSchema = useMemo(() =>{
   return yup.object({
      phone: yup.string().phone("VN").required(t.forgotPhone),
      email: yup.string().required(t.email).email(t.email),
      agree: yup.boolean().oneOf([true], t.agreeDescription),
    })
  },[locale]);


  const formik = useFormik({
    initialValues: {
      phone: "",
      email: "",
      agree: false,
    },
    validationSchema: validationPhoneSchema,
    onSubmit: async (value) => {
      if (!contract) {
        return;
      }
      try {
        getAdminWallet && (await getAdminWallet());
        setOpenedPayingPopup(true);
        const result = await contract.methods
          .approve(
            adminWallet,
            (
              Number(convertVoucherToShod(valueVoucher, rateConvert)) *
              10 ** decimals
            ).toString()
          )
          .send({
            from: address,
          });
        if (result.transactionHash) {
          const getToken = executeRecaptcha as any;
          const captcha = await getToken("signup");
          const { data } = await axios.post(`${serverURL}/order`, {
            user: address,
            amount: (
              Number(convertVoucherToShod(valueVoucher, rateConvert)) *
              10 ** decimals
            ).toString(),
            value: valueVoucher,
            phone: value.phone,
            email: value.email,
            txt: result.transactionHash,
            captcha,
            netWork,
          });
          if (data.success) {
            setIsPaid(true);
            setDataQRCode(data.data.code);
          } else {
            setErr(true);
            setOpenedPayingPopup(false);
          }
        }

        setOpenedPayingPopup(false);
      } catch (error: any) {
        console.log(error);
        setErr(true);
        setOpenedPayingPopup(false);
      }
    },
  });

  return (
    <main
      className={`p-[16px] container ${!isShow ? "hidden" : "mainContent"}`}
    >
      <div className="main_top flex">
        <img src="/assets/images/logo-header.png" alt="" />
      </div>
      <section className="main__mid">
      {wrongChain && (
              <div className="text-red mt-2 mb-5 text-sm text-center">{t.wrongChain}</div>
            )}

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
            <p className="moneyVoucher">
              {valueVoucher} {t.coin}
            </p>
          </div>
          <div className={style["title-price"]}>{t.payment}</div>
          <h1 className={style["token-id"]}>
            {address === ""
              ? 0
              :
              new BigNumber(
                new BigNumber(
                  convertVoucherToShod(valueVoucher, rateConvert)
                ).toFixed(4, 1)
              ).toString().replace(".",",")
              
              
              }&nbsp;
            SHOD
          </h1>
          <div className="hr"></div>
          <div className="buyer__item">
            <div className={style["buyer-name-val"]}>{t.phoneNumber}<span style={{color:'red'}}>*</span> :</div>
            <input
              className={`${style["contact-input"]} ${
                formik.touched.phone &&
                Boolean(formik.errors.phone) &&
                "border border-red-500 border-2"
              }`}
              type="text"
              value={formik.values.phone}
              name="phone"
              placeholder={t.phoneNumber}
              onChange={formik.handleChange}
            ></input>
                        {formik.touched.phone && Boolean(formik.errors.phone) && (
              <div className="text-red mt-2 text-sm">{t.forgotPhone}</div>
            )}
          </div>
          <div className="buyer__item">
            <div className={style["buyer-name-val"]}>{t.formEmail}<span style={{color:'red'}}>*</span> :</div>
            <input
              className={`${style["contact-input"]} ${
                formik.touched.email &&
                Boolean(formik.errors.email) &&
                "border border-red-500 border-2"
              }`}
              type="email"
              value={formik.values.email}
              placeholder={t.formEmail}
              onChange={formik.handleChange}
              name="email"
            ></input>
                        {formik.touched.email && Boolean(formik.errors.email) && (
              <div className="text-red mt-2 text-sm">{formik.errors.email}</div>
            )}
          </div>

          <div className="wrap-fix">
            <span className={style["title-you"]}>
              <input
                checked={formik.values.agree}
                onChange={formik.handleChange}
                type="checkbox"
                name="agree"
              />
              &nbsp;
              {t.agree}&nbsp;
              <span
                className={`${style["color-primary"]} cursor-pointer`}
                onClick={setFaq}
              >
                {t.condition}
              </span>
            </span>
            {formik.touched.agree && Boolean(formik.errors.agree) && (
              <div className="text-red mt-2 text-sm">{formik.errors.agree}</div>
            )}
            <button
              type="button"
              onClick={() => {
                if (address === "") {
                  message.warning(t.warningConnect);
                } else {
                  formik.handleSubmit();
                }
              }}
              className={style["button-buy"]}
              disabled={wrongChain}
            >
              {t.buy}
            </button>

          </div>
        </section>
      </section>
    </main>
  );
};

export default Buy;
