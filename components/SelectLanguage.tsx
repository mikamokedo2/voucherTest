import React from "react";
import { useRouter } from "next/router";
import { Dropdown, Menu, Space } from 'antd';




const SelectLanguage = () => {
  const router = useRouter();
  const { locale } = router;

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const locale = e.target.value;
    router.push(router.pathname, router.asPath, { locale });
    localStorage.setItem("locale", locale === "en" ? "en" : "vn");
  };
  const items = [
    { label: (<div onClick={() =>  router.push(router.pathname, router.asPath, { locale:"vn" })} className="flex items-center"><img src="/assets/images/vietnam.png"/>&nbsp;Việt Nam</div>), key: 'vn'  }, // remember to pass the key prop
    { label: (<div onClick={() =>  router.push(router.pathname, router.asPath, { locale:"en" })} className="flex items-center"><img src="/assets/images/eng.png"/>&nbsp;English</div>), key: 'en' },
  ];
  return (
    <Dropdown menu={{ items }} className="select-language">
      <div className="uppercase cursor-pointer">
        { locale === "en" ? <img src="/assets/images/eng.png" style={{width:'20px'}}/> : <img src="/assets/images/vietnam.png" style={{width:'20px'}}/>}
      
        <span className="ml-[5px]">{locale}</span>
      <div className="ml-[5px]"> 
      <img src="/icons/arrowbottom.png"/>
      </div>
      </div>
      
  </Dropdown>
  );
};

export default SelectLanguage;
