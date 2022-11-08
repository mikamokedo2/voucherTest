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




const Support = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : vn;
  const [showSuccess,setShowSuccess] = useState(false);
  const [isLoading,setIsLoading] = useState(false);


  const validationPhoneSchema = yup.object({
    phone: yup.string().required(t.forgotPhone),
    email: yup.string().required(t.email),
    address: yup.string().required(t.forgotWallet),
    description: yup.string().required(t.forgotDescription),
  });

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
        // toast.success(t.sendRequest)
        setShowSuccess(true);
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
      {!showSuccess ? 
            <div>
            <img src="/assets/images/mail.png" alt="" /> 
            <p className="text-white">{t.support}</p>
            <div className="contact__item">
              <div className="title">{t.phoneNumber}:</div>
              <input
                type="text"
                placeholder={t.phoneNumber}
                className={`${style["contact-input"]} ${formik.touched.phone && Boolean(formik.errors.phone) && "border border-red-500 border-solid"}`}
                name="phone"
                onChange={formik.handleChange}
              />
                          {formik.touched.phone && Boolean(formik.errors.phone) && (
              <div className="text-red mt-2">{formik.errors.phone}</div>
            )}
            </div>

            <div className="contact__item">
              <div className="title">{t.formEmail} :</div>
              <input
                type="text"
                placeholder={t.formEmail}
                className={`${style["contact-input"]} ${formik.touched.email && Boolean(formik.errors.email) && "border border-red-500 border-solid"}`}
                name="email"
                onChange={formik.handleChange}
                
              />
                          {formik.touched.email && Boolean(formik.errors.email) && (
              <div className="text-red mt-2">{formik.errors.email}</div>
            )}
            </div>

            <div className="contact__item">
              <div className="title">{t.addressWallet} :</div>
              <input
                type="text"
                placeholder={t.addressWallet}
                className={`${style["contact-input"]} ${formik.touched.address && Boolean(formik.errors.address) && "border border-red-500 border-solid"}`}
                name="address"
                onChange={formik.handleChange}
                
              />
                          {formik.touched.address && Boolean(formik.errors.address) && (
              <div className="text-red mt-2">{formik.errors.address}</div>
            )}
            </div>

            <div className="contact__item">
              <div className="title">{t.descriptionSupport} :</div>
              <textarea
                placeholder={t.descriptionSupport}
                rows={5}
                className={`${style["contact-input"]} ${formik.touched.description && Boolean(formik.errors.description) && "border border-red-500 border-solid"}`}
                name="description"
                onChange={formik.handleChange}
              />
                          {formik.touched.description && Boolean(formik.errors.description) && (
              <div className="text-red mt-2">{formik.errors.description}</div>
            )}
            </div>

            <button className="btn__main w-[100%] mb-[100px] font-bold" onClick={() => formik.handleSubmit()} disabled={isLoading}>{t.send}</button>
            </div>
            :
            <div className='send_success'>
              <img src='/assets/images/success.png'/>
                <div className='text-title'>{t.sendSuppportSuccess}</div>
                <div className='text-description'>{t.reContact}</div>
                <div className='button button-outline mt-[30px]' onClick={() => router.push("/")}>
                {t.backToHome}
                </div>
            </div>  
    }

  </div>
  )
}

export default Support
