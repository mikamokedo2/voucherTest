import "../styles/globals.css";
import type { AppProps } from "next/app";
import "./../styles/comfortaa.css";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import "./../styles/main.css";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LcfPlMiAAAAAElmb9nx2Ejm31DgWhznaSspvRpa">
      <Component {...pageProps} />
    </GoogleReCaptchaProvider>
  );
}

export default MyApp;
