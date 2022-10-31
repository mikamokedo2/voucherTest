import React, { useRef } from "react";
import QRCode from "react-qr-code";
import { useRouter } from "next/router";
import en from "../locales/en";
import vn from "../locales/vn";

interface SuccessProps {
  dataQRCode: string;
  onClosed: () => void;
}

const Success: React.FC<SuccessProps> = ({ dataQRCode, onClosed }) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : vn;

  const textAreaRef = useRef<HTMLSpanElement>(null);
  const handleCopied = () => {
    if (textAreaRef.current) {
      const text = textAreaRef.current.innerText;
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <div
      className={`fixed w-[100vw] h-[100vh] bg-[black] bg-opacity-40 popupWallet`}
    >
      <div className="popupBuy">
        <div className={`rounded-[4px] flex flex-col items-center`}>
          <h3 className="text-white font-semibold text-[16px] text-center">
            {t.yourVoucher} :
          </h3>
          <h1 className="text-white text-[28px] font-medium text-center flex flex-row items-center gap-3 justify-center mb-[10px]">
            <span
              style={{ display: "flex", alignItems: "center" }}
              ref={textAreaRef}
            >
              {dataQRCode}
            </span>
            <span onClick={handleCopied} className="cursor-pointer">
              <img src="/assets/images/doc.png" />
            </span>
          </h1>
          <QRCode value={dataQRCode} level={"H"} />
          <div className="flex flex-col mx-[9px] mt-[60px] gap-[16px] mb-[16px] flex">
            <a
              href="shopdi://shopdi.io"
              target={"_blank"}
              className="flex py-[14px] flex-row items-center justify-center rounded-[2px] border-solid border-[1px] border-black text-black cursor-pointer font-bold text-[16px]  btn__main"
            >
              {t.usedApp}
            </a>
            <button
              className="flex py-[14px] flex-row items-center justify-center rounded-[2px] font-bold text-[16px]"
              onClick={onClosed}
            >
              {t.continue}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
