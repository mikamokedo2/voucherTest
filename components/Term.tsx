import React from 'react'
import { useRouter } from "next/router";
import en from "../locales/en";
import vn from "../locales/vn";

const Term = () => {
    const router = useRouter();
    const { locale } = router;
    const t = locale === "en" ? en : vn;
  return (
    <div className='container mx-auto block white-page p-[16px]'>
        <div className='big-title-01 text-center text-white mb-[50px]'>{t.termTitle}</div>
        <div dangerouslySetInnerHTML={{__html:t.termDescription}} className="text-white line-height-text"/>
    </div>
  )
}

export default Term
