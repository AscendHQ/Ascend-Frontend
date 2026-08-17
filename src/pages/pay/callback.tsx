import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

import { Spinner } from "@/components/ui/Loading";

const apiBaseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export default function PaymentCallback() {
  const router = useRouter();
  const token = router.query.token as string;
  const reference = (router.query.reference ?? router.query.trxref) as string;
  const verificationQuery = useQuery({
    queryKey: ["verifyOnlinePayment", reference, token],
    queryFn: () =>
      axios
        .get(`${apiBaseUrl}/fees/public/payments/${reference}/verify`, {
          params: { token },
        })
        .then(
          response =>
            response.data as { status: string; receipt_number: string }
        ),
    enabled: Boolean(reference && token),
    retry: 2,
  });

  const returnUrl = token ? `/pay/${token}` : "/";
  if (verificationQuery.isLoading || !router.isReady) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-neutral-300 p-6">
        <Spinner />
        <p className="text-sm text-gray-800">Confirming your payment...</p>
      </main>
    );
  }

  const isSuccessful = verificationQuery.data?.status === "success";
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-300 p-6">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
        <Icon
          icon={
            isSuccessful
              ? "material-symbols:check-circle-rounded"
              : "material-symbols:error-rounded"
          }
          className={`mx-auto text-6xl ${
            isSuccessful
              ? "text-secondary-green-600"
              : "text-secondary-red-600"
          }`}
        />
        <h1 className="mt-4 text-2xl font-bold">
          {isSuccessful ? "Payment confirmed" : "Payment not confirmed"}
        </h1>
        <p className="mt-2 text-sm text-gray-800">
          {isSuccessful
            ? `Receipt ${verificationQuery.data?.receipt_number} has been created and the invoice balance is updated.`
            : "We could not verify this transaction. If your account was debited, contact the school with your payment reference."}
        </p>
        {reference && (
          <p className="mt-3 text-xs text-gray-800">Reference: {reference}</p>
        )}
        <Link
          href={returnUrl}
          className="mt-6 inline-block rounded-lg bg-primary-purple-700 px-5 py-3 font-semibold text-white"
        >
          View invoice
        </Link>
      </section>
    </main>
  );
}
