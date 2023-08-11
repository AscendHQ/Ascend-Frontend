import "@/styles/globals.css";
import "@/styles/loading.module.css";

import type { AppProps } from "next/app";
import NextNprogress from "nextjs-progressbar";

import { GTWalsheimPro, InterFont } from "@/assets/fonts";

export default function App({ Component, pageProps }: AppProps) {
  const TuftsBlue = "#3498DB";

  return (
    <>
      <style jsx global>
        {`
          :root {
            --inter-font: ${InterFont.style.fontFamily};
            --GTWalsheimPro-font: ${GTWalsheimPro.style.fontFamily};
          }
        `}
      </style>
      <NextNprogress
        color={TuftsBlue}
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
      />

      <Component {...pageProps} />
    </>
  );
}
