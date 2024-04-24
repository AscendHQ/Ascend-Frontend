import React from "react";

import { Container } from "@/components/layout/dashboard";
import { Spinner } from "@/components/ui/Loading";

export default function Learning() {
  return (
    <Container headerTitle="Learning">
      <div className="flex justify-center min-h-full items-center">
        <Spinner />
      </div>
    </Container>
  );
}
