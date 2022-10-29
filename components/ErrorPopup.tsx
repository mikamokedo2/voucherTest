import React from "react";
import style from "../styles/home.module.css";
import { useRouter } from "next/router";
import en from "../locales/en";
import vn from "../locales/vn";

interface ErrorPopupProps{
  onClose:() => void;
}

const ErrorPopup:React.FC<ErrorPopupProps> = ({onClose}) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : vn;

  return (
    <div
      className={`fixed w-[100vw] h-[100vh] bg-[black] bg-opacity-40 popupWallet`}
    >
      <div className="popupBuy">
      <img
       onClick={onClose}
          className={style["img-close"]}
          src="/multiply.png"
        />
        <div className={`rounded-[4px] `}>
          <div className="flex px-[8px] flex-row loading">
            <div className="border-solid border-[1px]   border-[#666666] loading_item ">
              <div className="w-[100%] h-[100%]  flex flex-row items-center justify-center loading_item-box ">
                <span className="text-white font-medium   ">
                  <img src="/err.png" className="icon_load" />
                </span>
              </div>
            </div>
          </div>
          <p className="text-white font-medium text-[500] text-center py-[32px]">
            {t.buiFailed}
          </p>
          <p className="px-[37px] text-white text-[14px] font-normal text-center mt-[40px] flex">
            {t.tryAgain}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPopup;
