import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import en from "../locales/en";
import vn from "../locales/vn";

const Footer = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : vn;
  return (
    <div className="container mx-auto text-[white] block p-[16px]">
      <div className="gap-[30px] flex justify-between pb-[32px] border-b flex-col border-gray-100 border-solid lg:flex-row lg:gap-[0px]">
        <div className="w-[250px]">
          <img src="/assets/images/logo-footer.png" />
        </div>
        <div className="w-[250px]">
          <div className="uppercase text-sm mb-[16px] font-bold">{t.language}</div>
          <div className="flex text-sm items-center mb-[12px]">
            <img src="/assets/images/vietnam.png" className="mr-[10px]" />
            Tiếng Việt
          </div>
          <div className="flex text-sm items-center">
            <img src="/assets/images/eng.png" className="mr-[10px]" />
            English
          </div>
        </div>
        <div className="w-[250px]">
          <div className="uppercase text-sm mb-[16px] font-bold">
            {t.supportCustomer}
          </div>
          <div className="flex text-sm items-center mb-[12px]">
            <Link href="/support">
              <a>{t.contact}</a>
            </Link>
          </div>
          <div className="flex text-sm items-center">
            <Link href="/faq">
              <a>{t.faq}</a>
            </Link>
          </div>
        </div>

        {/* <div className="w-[250px]">
          <div className="uppercase text-sm mb-[16px] font-bold">
            {t.connectUs}
          </div>
          <div className="flex gap-[12px]">
            <div className="footer-socials-item">
              <a
                className="hover-opacity"
                href=""
              >
                <img
                  src="/assets/images/facebook.png"
                  alt="facebook"
                  style={{ maxWidth: "32px" }}
                />
              </a>
            </div>
            <div className="footer-socials-item">
              <a
                className="hover-opacity"
                href=""
              >
                <img
                  src="/assets/images/youtube.png"
                  alt="youtube"
                  style={{ maxWidth: "32px" }}
                />
              </a>
            </div>

            <div className="footer-socials-item">
              <a className="hover-opacity" href="">
                <img
                  src="/assets/images/tele.png"
                  alt="telegram"
                  style={{ maxWidth: "32px" }}
                />
              </a>
            </div>
            <div className="footer-socials-item">
              <a
                className="hover-opacity"
                href=""
              >
                <img
                  src="/assets/images/twitter.png"
                  alt="twitter"
                  style={{ maxWidth: "32px" }}
                />
              </a>
            </div>
            <div className="footer-socials-item">
              <a href="" className="hover-opacity">
                <img
                  src="/assets/images/zalo.png"
                  alt="zalo"
                  style={{ maxWidth: "32px" }}
                />
              </a>
            </div>
            <div className="footer-socials-item">
              <a href="" className="hover-opacity">
                <img
                  src="/assets/images/medium.png"
                  alt="zalo"
                  style={{ maxWidth: "32px" }}
                />
              </a>
            </div>
          </div>
        </div> */}
      </div>
      <div className="flex justify-end mt-[16px] pb-[20px]">
        <a className="text-sm mr-[24px]">{t.term}</a>
        <a className="text-sm">{t.security}</a>
      </div>
    </div>
  );
};

export default Footer;
