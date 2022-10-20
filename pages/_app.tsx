import "../styles/globals.css";
import type { AppProps } from "next/app";
import "./../styles/comfortaa.css";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import "./../styles/main.css";
import { ToastContainer } from "react-toastify";
import { DAppProvider } from '@usedapp/core';

const config = {
  readOnlyChainId: 97,
  readOnlyUrls: {
    [97]: 'https://dev.kardiachain.io',
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LcfPlMiAAAAAElmb9nx2Ejm31DgWhznaSspvRpa">
        <ToastContainer />
      <Component {...pageProps} />
    </GoogleReCaptchaProvider>
  );
}

export default MyApp;
