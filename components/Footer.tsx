import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="container mx-auto text-[white] block p-[16px]">
      <div className="gap-[30px] flex justify-between pb-[32px] border-b flex-col border-gray-100 border-solid lg:flex-row lg:gap-[0px]">
        <div className="w-[250px]">
          <img src="/assets/images/logo-footer.png" />
        </div>
        <div className="w-[250px]">
          <div className="uppercase text-sm mb-[16px] font-bold">Ngôn ngữ</div>
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
            Hỗ trợ khách hàng
          </div>
          <div className="flex text-sm items-center mb-[12px]">
            <Link href="/support">
              <a>Liên hệ với chúng tôi</a>
            </Link>
          </div>
          <div className="flex text-sm items-center">
            <Link href="/faq">
              <a>Các câu hỏi thường gặp</a>
            </Link>
          </div>
        </div>

        <div className="w-[250px]">
          <div className="uppercase text-sm mb-[16px] font-bold">
            KẾT NỐI VỚI CHÚNG TÔI
          </div>
          <div className="flex gap-[12px]">
            <div className="footer-socials-item">
              <a
                className="hover-opacity"
                href="https://www.facebook.com/shopdi.official"
              >
                <img
                  src="assets/images/facebook.png"
                  alt="facebook"
                  style={{ maxWidth: "32px" }}
                />
              </a>
            </div>
            <div className="footer-socials-item">
              <a
                className="hover-opacity"
                href="https://www.youtube.com/channel/UCUEJ-fUE4-ONf-LVdizZSTg"
              >
                <img
                  src="assets/images/youtube.png"
                  alt="youtube"
                  style={{ maxWidth: "32px" }}
                />
              </a>
            </div>

            <div className="footer-socials-item">
              <a className="hover-opacity" href="https://t.me/ShopdiOfficial">
                <img
                  src="assets/images/tele.png"
                  alt="telegram"
                  style={{ maxWidth: "32px" }}
                />
              </a>
            </div>
            <div className="footer-socials-item">
              <a
                className="hover-opacity"
                href="https://twitter.com/shopdi_official"
              >
                <img
                  src="assets/images/twitter.png"
                  alt="twitter"
                  style={{ maxWidth: "32px" }}
                />
              </a>
            </div>
            <div className="footer-socials-item">
              <a href="" className="hover-opacity">
                <img
                  src="assets/images/zalo.png"
                  alt="zalo"
                  style={{ maxWidth: "32px" }}
                />
              </a>
            </div>
            <div className="footer-socials-item">
              <a href="" className="hover-opacity">
                <img
                  src="assets/images/medium.png"
                  alt="zalo"
                  style={{ maxWidth: "32px" }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-[16px] pb-[20px]">
        <div className="text-sm mr-[24px]">Các điều khoản và điều kiện</div>
        <div className="text-sm">Chính sách bảo mật</div>
      </div>
    </div>
  );
};

export default Footer;
