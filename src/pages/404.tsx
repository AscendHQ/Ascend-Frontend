import React from "react";

import { Container } from "@/components/layout/dashboard";

export default function Dashboard404() {
  return (
    <Container headerTitle="Page Not Found">
      <main className="px-10 py-5 h-full bg-white">
        <h2>Oops!. Page nor found.</h2>
      </main>
    </Container>
  );
}
