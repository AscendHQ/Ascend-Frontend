import { GTWalsheimPro, inter } from "@/assets/fonts";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --inter-font: ${inter.style.fontFamily};
          --GTWalsheimPro-font: ${GTWalsheimPro.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
