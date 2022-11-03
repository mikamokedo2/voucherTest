import React, { useState } from "react";
import style from "../styles/home.module.css";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import en from "../locales/en";
import vn from "../locales/vn";
import { Col, Collapse, Row } from "antd";

const { Panel } = Collapse;
const createMarkup = (content: string): any => {
  return { __html: content };
};

const HTMLComp = ({ content }: any): any => {
  // const { comp_content } = {};
  console.log("Content HTML", content);
  return <div dangerouslySetInnerHTML={createMarkup(content)} />;
};

const dataFaq = [
  {
    number: "01",
    title:
      "Tôi có thể mua Voucher bằng crypto khác chứ không phải SHOD được không?",
    content: `Hiện nay hệ thống chỉ hỗ trợ mua Voucher bằng SHOD. Việc mua Voucher bằng đơn vị tiền tệ khác sẽ được bổ sung sớm. Hãy theo dõi trang của chúng tôi để cập nhật thông tin mới nhất.`,
  },
  {
    number: "02",
    title:
      "Tôi có thể sử dụng SHOD mua các Voucher khác trên [link market place] được không?",
    content: `Được, bạn có thể sử dụng SHOD để mua các voucher được công bố tại [Link]`,
  },

  {
    number: "03",
    title: "Tôi có thể sử dụng ví nào để mua Voucher?",
    content: `Bạn có thể sử dụng các ví sau để giao dịch:<br/>
    - Metamask<br/>
    - WalletConnect<br/>
    - Binance Chain Wallet<br/>
    - TrustWallet<br/>
    - Math Wallet<br/>
    - TokenPocket<br/>
    - SafePal Wallet`,
  },

  {
    number: "04",
    title: "Tôi có thể mua SHOD ở đâu? ",
    content: `Hiện tại SHOD đang được niêm yết trên các sàn như: BHO Pad, Onebit Starup Pad, Pancake Swap, Kaidex. `,
  },
  {
    number: "05",
    title: "Thanh toán tiền điện tử hoạt động như thế nào?",
    content: `Để thanh toán bằng tiền điện tử, bạn thực hiện các bước sau:<br/>
    - B1: liên kết ví<br/>
    - B2: sử dụng SHOD để mua Voucher<br/>
    - B3: chọn loại Voucher và thanh toán`,
  },
  {
    number: "06",
    title: "Ngoài voucher thì tôi có thể sở hữu Shopdi Xu bằng cách nào?",
    content: `Ngoài Voucher, bạn có thể tham gia các hội nhóm trao đổi xu trên các kênh mạng xã hội. `,
  },
  {
    number: "07",
    title:
      "Sau khi thực hiện giao dịch mua Voucher, tôi sẽ nhận được Voucher trong thời gian bao lâu?",
    content: `Sau khi thực hiện giao dịch mua Voucher tại [Website-Link] bạn vui lòng không thoát khỏi trang. Chúng tôi sẽ gửi Voucher đến tài khoản đăng ký nhận Voucher của bạn khi giao dịch hoàn tất.`,
  },
  {
    number: "08",
    title:
      "Tôi đã mua Voucher nhưng không nhận được Voucher ở bất kì nền tảng nào. Tôi nên làm gì?",
    content: `Khi bạn đã mua Voucher nhưng không nhận được Voucher ở bất kì nền tảng nào trong 24h, vui lòng liên hệ hotline 1900 3395 để được hỗ trợ kịp thời`,
  },
  {
    number: "09",
    title:
      "Sau khi mua Voucher, tôi sẽ nhận voucher ở đâu và quy đổi thành Shopdi Xu như thế nào?",
    content: `Từ Voucher bạn quy đổi thành Shopdi Xu:<br/>
    - B1: đăng nhập tài khoản Shopdi <br/>
    - B2: truy cập Ví Shopdi & chọn Đổi voucher<br/>
    - B3: Voucher hiện trong danh sách <br/>
    - B4: chuyển đổi Voucher<br/>
    - B5: Shopdi Xu sẽ tự động lưu vào Ví của bạn`,
  },
  {
    number: "10",
    title: "Tôi mua và thanh toán nhầm voucher thì tôi phải làm gì?",
    content: `Voucher sẽ không được hoàn lại khi đã quy đổi Shopdi Xu. Vui lòng kiểm tra kĩ thông tin voucher trước khi thanh toán`,
  },
  {
    number: "11",
    title: "Làm thế nào để tôi kiểm tra lịch sử mua Voucher của mình?",
    content: `Bạn vào ví đã dùng để thanh toán Voucher và nhấn vào kiểm tra lịch sử giao dịch.`,
  },
  {
    number: "12",
    title: "Tôi có thể mua Voucher và chuyển cho người dùng khác được không?",
    content: `Được, chỉ cần bạn nhập số điện thoại của người được tặng khi thực hiện thanh toán, Voucher sẽ được gửi về tài khoản đã được nhập. Lưu ý: số điện thoại đã của người được tặng đã đăng ký tài khoản trên Shopdi.`,
  },
];

const Support = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : vn;

  return (
    <div className="container mx-auto Faq contact_faq">
        <div className="w-[100%] order-2 md:w-[80%] md:order-2">
          <p className="text-white title-faq">{t.faq}</p>
          <Collapse
            expandIconPosition="right"
            accordion
            expandIcon={({ isActive }): React.ReactElement => (
              <div className="Faq-panel-icon">
                {isActive ? (
                  <svg
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.6936 12H19.6936"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.6936 5V19"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.6936 12H19.6936"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            )}
          >
            {dataFaq.map((item, index) => (
              <Panel
                key={index}
                header={
                  <div className="Faq-panel-header flex items-center">
                    <div className="Faq-panel-header-number">{item.number}</div>
                    <h4 className="Faq-panel-header-title">{item.title}</h4>
                  </div>
                }
              >
                <p className="Faq-panel-content">
                  <HTMLComp content={item.content} />
                </p>
              </Panel>
            ))}
          </Collapse>
        </div>
        <div className="w-[50%] order-1 flex justify-center items-start max-md:w-[100%] md:order-2 img-faq">
          <img src="./faq.png" alt="" />
        </div>
    </div>
  );
};

export default Support;
