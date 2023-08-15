import React from "react";

import { Container } from "@/components/layout/dashboard";
import MainSection from "@/templates/Dashboard-overview/main-section";

export default function Dashboard() {
  return (
    <Container headerTitle="Overview">
      <MainSection />
    </Container>
  );
}
