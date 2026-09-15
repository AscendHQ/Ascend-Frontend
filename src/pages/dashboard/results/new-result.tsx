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
        <main className="min-h-full bg-white px-4 py-5 sm:px-6 lg:px-10 lg:py-8">
          <div className="flex justify-between">
            <Link
              href={DASHBOARD_RESULT}
              className="inline-flex items-center gap-3 text-sm font-semibold text-primary-purple-700"
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
