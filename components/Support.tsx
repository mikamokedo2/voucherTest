import React,{useState} from 'react';
import style from "../styles/home.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import en from "../locales/en";
import vn from "../locales/vn";
import { serverURL } from '../constants/const';

export const validationPhoneSchema = yup.object({
  phone: yup.string().required("Bạn chưa nhập số điện thoại"),
  email: yup.string().required("Bạn chưa nhập số điện thoại"),
  address: yup.string().required("Bạn chưa nhập số điện thoại"),
  description: yup.string().required("Bạn chưa nhập số điện thoại"),
});


const Support = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : vn;
  const [isLoading,setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      phone: "",
      email: "",
      address:"",
      description:""
    },
    validationSchema: validationPhoneSchema,
    onSubmit: async (value) => {
     try {
      setIsLoading(true);
      const { data } = await axios.post(`${serverURL}/contact`,{...value});
      if (data.success) {
        toast.success(t.sendRequest)
      }else{
        toast.error(data.message)
      }
      setIsLoading(false);
     } catch (error) {
      toast.error(t.tryAgain);
      setIsLoading(false);
     }
    },
  });

  return (
    <div className="contact__suport block">
    <img src="./mail.png" alt="" /> 
    <p className="text-white">{t.support}</p>
    <div className="contact__item">
      <div className="">{t.phoneNumber}:</div>
      <input
        type="text"
        placeholder={t.phoneNumber}
        className={`${style["contact-input"]} ${formik.touched.phone && Boolean(formik.errors.phone) && "border border-red-500 border-solid"}`}
        name="phone"
        onChange={formik.handleChange}
      />
    </div>
    <div className="contact__item">
      <div className="">Email :</div>
      <input
        type="text"
        placeholder="Email"
        className={`${style["contact-input"]} ${formik.touched.email && Boolean(formik.errors.email) && "border border-red-500 border-solid"}`}
        name="email"
        onChange={formik.handleChange}
        
      />
    </div>
    <div className="contact__item">
      <div className="">{t.addressWallet} :</div>
      <input
        type="text"
        placeholder={t.addressWallet}
        className={`${style["contact-input"]} ${formik.touched.address && Boolean(formik.errors.address) && "border border-red-500 border-solid"}`}
        name="address"
        onChange={formik.handleChange}
        
      />
    </div>
    <div className="contact__item">
      <div className="">{t.descriptionSupport} :</div>
      <textarea
        placeholder={t.descriptionSupport}
        rows={5}
        className={`${style["contact-input"]} ${formik.touched.description && Boolean(formik.errors.description) && "border border-red-500 border-solid"}`}
        name="description"
        onChange={formik.handleChange}
      />
    </div>
    <button className="btn__main w-[100%] mb-[100px] font-bold" onClick={() => formik.handleSubmit()} disabled={isLoading}>{t.send}</button>
  </div>
  )
}

export default Support
