import "../styles/globals.css";
import type { AppProps } from "next/app";
import "./../styles/comfortaa.css";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import "./../styles/main.css";
import { ToastContainer } from "react-toastify";
import AuthProvider from "../hook/web3";
import '../styles/antd.css';
import "../styles/faq.scss";
import ProgressIndicator from "../components/Progress";
import 'react-tabs/style/react-tabs.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/common.scss";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LcfPlMiAAAAAElmb9nx2Ejm31DgWhznaSspvRpa">
      <ProgressIndicator />
        <ToastContainer />
        <AuthProvider>
      <Component {...pageProps} />
      </AuthProvider>
    </GoogleReCaptchaProvider>
  );
}

export default MyApp;
