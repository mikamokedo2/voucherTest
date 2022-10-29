import React from "react";
import { useRouter } from "next/router";


const SelectLanguage = () => {
  const router = useRouter();
  const { locale } = router;

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const locale = e.target.value;
    router.push(router.pathname, router.asPath, { locale });
    localStorage.setItem("locale", locale === "en" ? "en" : "vi");
  };

  return (
    <select
      onChange={changeLanguage}
      defaultValue={locale}
      id="gender"
      className="seclecBox_item"
    >
      <option className="body-04" value="vn">
        🇻🇳 VIE
      </option>
      <option className="body-04" value="en">
        🇺🇸 ENG
      </option>
    </select>
  );
};

export default SelectLanguage;
