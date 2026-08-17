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
import { useRouter } from "next/router";
import NextNprogress from "nextjs-progressbar";
import React from "react";

import { GTWalsheimPro, InterFont } from "@/assets/fonts";
import ProtectedRoute from "@/components/layout/protect-route";
import MetaTag from "@/config/metaTag";

import theme from "../styles/themeConfig";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const TuftsBlue = "#3498DB";
  const router = useRouter();
  const isDashboardRoute = router.pathname.startsWith("/dashboard");
  const isProtectedRoute =
    isDashboardRoute ||
    router.pathname.startsWith("/parent") ||
    router.pathname.startsWith("/student");
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
              {isProtectedRoute ? (
                <ProtectedRoute>
                  <Component {...pageProps} />
                </ProtectedRoute>
              ) : (
                <Component {...pageProps} />
              )}
            </ConfigProvider>
          </AnimatePresence>
        </HydrationBoundary>
        {process.env.NODE_ENV !== "production" && <ReactQueryDevtools />}
      </QueryClientProvider>
    </>
  );
}
