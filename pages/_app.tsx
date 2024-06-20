import type { AppProps } from "next/app";
import "../styles/global.scss";
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";
import { NextIntlClientProvider } from "next-intl";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AxiosProvider from "@/app/context/AxiosContext";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <AppCacheProvider {...pageProps}>
      <NextIntlClientProvider
        locale={router.locale}
        timeZone="Europe/Vienna"
        messages={pageProps.messages}
      >
        <AxiosProvider>
          <ToastContainer />
          <Component {...pageProps} />
        </AxiosProvider>
      </NextIntlClientProvider>
    </AppCacheProvider>
  );
}
