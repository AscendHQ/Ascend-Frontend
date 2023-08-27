import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import type { DocumentContext } from "next/document";
import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";

const MyDocument = () => (
  <Html lang="en">
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
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const cache = createCache();
  const originalRenderPage = ctx.renderPage;
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => (
        <StyleProvider cache={cache}>
          <App {...props} />
        </StyleProvider>
      ),
    });

  const initialProps = await Document.getInitialProps(ctx);
  const style = extractStyle(cache, true);
  return {
    ...initialProps,
    styles: (
      <>
        {initialProps.styles}
        <style dangerouslySetInnerHTML={{ __html: style }} />
      </>
    ),
  };
};

export default MyDocument;
