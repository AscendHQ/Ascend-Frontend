import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

import { Container } from "@/components/layout/dashboard";
import { DASHBOARD_RESULT } from "@/config/links";
import ResultInformation from "@/templates/Result/result-information";

export default function NewResult() {
  return (
    <div>
      <Container headerTitle={"New Result"}>
        <main className="bg-white px-10 pt-7 h-full">
          <div className="flex justify-between">
            <Link
              href={DASHBOARD_RESULT}
              className="flex items-center gap-3 text-sm"
            >
              <Icon icon="teenyicons:arrow-left-solid" />
              <span>Back</span>
            </Link>
          </div>
          <ResultInformation />
        </main>
      </Container>
    </div>
  );
}
