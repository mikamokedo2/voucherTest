import React from "react";
import style from "../styles/home.module.css";
import { useRouter } from "next/router";
import en from "../locales/en";
import vn from "../locales/vn";

interface FaqPopupProps {
  onClose: () => void;
}

const FaqPopup: React.FC<FaqPopupProps> = ({ onClose }) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : vn;

  return (
    <>
    <div
      className={`fixed w-[100vw] h-[100vh] bg-[black] bg-opacity-40 popupWallet`}
    />
      <div className="popupBuy popupBuy-white">
        <img
          onClick={onClose}
          className={style["img-close"]}
          src="/assets/images/multiply.png"
        />
        <div className={`rounded-[4px] `}>
          <div className="text-lg mb-[20px] font-semibold">{t.termVoucher}</div>
           {t.descTermVoucher}
        </div>
      </div>
   
    </>
  );
};

export default FaqPopup;
