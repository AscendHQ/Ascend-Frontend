import "@/styles/globals.css";
import "@/styles/loading.module.css";

import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConfigProvider } from "antd";
import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";
import NextNprogress from "nextjs-progressbar";
import React from "react";

import { GTWalsheimPro, InterFont } from "@/assets/fonts";
import MetaTag from "@/config/metaTag";

import theme from "../styles/themeConfig";

export default function App({ Component, pageProps }: AppProps) {
  const TuftsBlue = "#3498DB";
  const [queryClient] = React.useState(() => new QueryClient());
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
      <MetaTag />
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <AnimatePresence>
            <ConfigProvider theme={theme}>
              <Component {...pageProps} />
            </ConfigProvider>
          </AnimatePresence>
        </HydrationBoundary>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}
