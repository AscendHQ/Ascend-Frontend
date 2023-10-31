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
import Head from "next/head";
import NextNprogress from "nextjs-progressbar";
import React from "react";

import { GTWalsheimPro, InterFont } from "@/assets/fonts";

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
      <Head>
        <title>School Management System Dashboard</title>
        <meta
          name="description"
          content="This is the school management system dashboard."
        />
        <meta name="keywords" content="school, management, system, dashboard" />
        <meta name="robots" content="index, follow" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <meta property="og:title" content="Ascend - School Management System" />
        <meta
          property="og:description"
          content="This is the school management system dashboard."
        />
        <meta
          property="og:image"
          content="https://www.example.com/images/school-management-system.png"
        />
        <meta
          property="og:url"
          content="https://www.school-management-gules.vercel.app/"
        />
        <meta property="og:type" content="website" />
      </Head>
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
