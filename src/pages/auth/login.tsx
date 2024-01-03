import Head from "next/head";
import React from "react";

import { Container } from "@/components/ui/container";
import { FormSection, ImageSection } from "@/templates/Login";

export default function Login() {
  return (
    <div className="font-inter">
      <Head>
        <title>Login - Ascend School Management System</title>
        <meta
          property="og:title"
          content="Login - Ascend School Management System"
        />
      </Head>
      <Container>
        <div className="flex gap-10 justify-between py-8 items-center">
          <ImageSection />
          <FormSection />
        </div>
      </Container>
    </div>
  );
}
