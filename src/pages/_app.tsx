import { InterFont, GTWalsheimPro } from "@/assets/fonts";
import "@/styles/globals.css";
import "@/styles/loading.module.css";
import NextNprogress from "nextjs-progressbar";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --inter-font: ${InterFont.style.fontFamily};
          --GTWalsheimPro-font: ${GTWalsheimPro.style.fontFamily};
        }
      `}</style>
      <NextNprogress
        color="#3498db"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
      />
      <Component {...pageProps} />
    </>
  );
}
