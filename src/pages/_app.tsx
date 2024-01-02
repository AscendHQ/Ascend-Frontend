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
        <meta
          name="description"
          content="This is the school management system dashboard."
        />
        <meta
          name="keywords"
          content="school, management, system, dashboard, education, student, enrollment, attendance, grades, curriculum, teachers, parents, communication, administration, online, learning, academic, records, scheduling, timetable, examinations, assessments, performance, analytics, reports, integrated, platform, user-friendly, efficient, secure, school software, educational technology, digital, information system, school administration, learning management, institute, institution, college, university, educational management, student information, progress tracking, communication, data management, school portal, e-learning, educational resources, academic performance, student records, school records, parent-teacher communication, education technology, school operations, administration software, school data, education management, classroom management, school app, academic planning, student management, teacher management, parent portal, educational software, student success, school leadership, educational administration, student engagement, learning analytics, academic excellence, educational platform, school improvement, curriculum management, school organization, education software, academic planning, educational leadership, school communication, educational innovation, school technology, school efficiency, educational resources, school development, school progress, educational insights, learning outcomes, institutional management, school productivity, academic success, student success, educational insights, digital transformation, school information system, education administration, school performance, educational insights, digital transformation, school information system, education administration, school performance"
        />
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
