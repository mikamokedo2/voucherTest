import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "../styles/home.module.css";
import { useRouter } from "next/router";
import en from "../locales/en";
import vn from "../locales/vn";
import Alert from "../components/Alert";
import Header from "../components/Header";
import Loading from "../components/Loading";
import ErrorPopup from "../components/ErrorPopup";
import Success from "../components/Alert";
import "yup-phone";
import FaqPopup from "../components/FaqPopup";
import Buy from "../components/Buy";
import { useWeb3 } from "../hook/web3";

// console.log(serverURL, socketURL);
  
const Home: NextPage = () => {
  const [openedPaying, setOpenedPayingPopup] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [dataQRCode, setDataQRCode] = useState("");
  const [faq, setFaq] = useState(false);
  const [err, setErr] = useState(false);
  const [isBuyPage, setIsBuyPage] = useState(false);
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : vn;
  const { fetchBalance } = useWeb3();

  return (
    <div className={style.root}>
      <Header />
      <div className={`container mx-auto p-[16px] ${isBuyPage ? "hidden" : "block"}`}>
        <div className="flex justify-center">
        <img src="/assets/images/money.png" alt="" />
        </div>
       
        <h1 className="title_name">{t.buyVoucher}</h1>
        <div className="flex gap-x-[10px]">
            <div className="box-voucher-type">
            <img src="/assets/images/shopdi.png" alt="" />
            </div>
            <div className="box-voucher-type">
            <div className="text-inside">Comming soon ...</div>
            </div>
        </div>
        <div className="home-description">
        Bạn có thể mua voucher để quy đổi Shopdi Xu và bắt đầu trải nghiệm các tính năng nổi bật tại Shopdi. Voucher sẽ được tự động lưu lại tại Ví Shopdi trong tài khoản của bạn.
        </div>
        <div className="seclecBox_item mt-[30px] w-[150px] mb-[100px] text-center" onClick={() => setIsBuyPage(true)}>
        {t.buyNow}
        </div>
      </div>
      <Buy
        setFaq={() => setFaq(true)}
        setOpenedPayingPopup={(state) => setOpenedPayingPopup(state)}
        setErr={(state) => setErr(state)}
        setIsPaid={(state) => setIsPaid(state)}
        setDataQRCode={(state) => setDataQRCode(state)}
        isShow={isBuyPage}
      />

      {/* ----------------------Thông báo---------------------------  */}
      {/* <Alert isPaid={isPaid} err={err} ethercanLink={ethercanLink} /> */}
      {openedPaying && <Loading />}
      {err && <ErrorPopup onClose={() => setErr(false)} />}
      {isPaid && dataQRCode && (
        <Success
          dataQRCode={dataQRCode}
          onClosed={() => {
            fetchBalance && fetchBalance();
            setDataQRCode("");
            setIsPaid(false);
          }}
        />
      )}
      {faq && <FaqPopup onClose={() => setFaq(false)} />}
    </div>
  );
};

export default Home;
