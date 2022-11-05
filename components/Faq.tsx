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



interface SupportProps{
  isShow:boolean;
}

const Support:React.FC<SupportProps> = ({isShow}) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : vn;
  const dataFaq = [
    {
      number: "01",
      title: t.dataFaqTitle1,
      content: t.dataFaqContent1,
    },
    {
      number: "02",
      title: t.dataFaqTitle2,
      content: t.dataFaqContent2,
    },
  
    {
      number: "03",
      title: t.dataFaqTitle3,
      content: t.dataFaqContent3,
    },
  
    {
      number: "04",
      title: t.dataFaqTitle4,
      content: t.dataFaqContent4,
    },
    {
      number: "05",
      title: t.dataFaqTitle5,
      content: t.dataFaqContent5,
    },
    {
      number: "06",
      title: t.dataFaqTitle6,
      content: t.dataFaqContent6,
    },
    {
      number: "07",
      title: t.dataFaqTitle7,
      content: t.dataFaqContent7,
    },
    {
      number: "08",
      title: t.dataFaqTitle8,
      content: t.dataFaqContent8,
    },
    {
      number: "09",
      title: t.dataFaqTitle9,
      content: t.dataFaqContent9,
    },
    {
      number: "10",
      title: t.dataFaqTitle10,
      content: t.dataFaqContent10,
    },
    {
      number: "11",
      title: t.dataFaqTitle11,
      content: t.dataFaqContent11,
    },
    // {
    //   number: "12",
    //   title: t.dataFaqTitle12,
    //   content: t.dataFaqContent12,
    // },
  ];
  return (
    <div className={`container mx-auto ${!isShow ? "hidden" : "contact_faq Faq"}`}>
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
