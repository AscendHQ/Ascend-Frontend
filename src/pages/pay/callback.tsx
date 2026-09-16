import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { Spinner } from "@/components/ui/Loading";

const apiBaseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

function useOnlineStatus() {
  const [isOnline, setIsOnline] = React.useState(true);
  React.useEffect(() => {
    const updateStatus = () => setIsOnline(window.navigator.onLine);
    updateStatus();
    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);
    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
    };
  }, []);
  return isOnline;
}

const getCallbackContent = ({
  isSuccessful,
  needsRetry,
  isOnline,
  receiptNumber,
}: {
  isSuccessful: boolean;
  needsRetry: boolean;
  isOnline: boolean;
  receiptNumber?: string;
}) => {
  if (isSuccessful) {
    return {
      icon: "material-symbols:check-circle-rounded",
      iconClass: "text-secondary-green-600",
      title: "Payment confirmed",
      description: `Receipt ${receiptNumber} has been created and the invoice balance is updated.`,
    };
  }
  if (needsRetry) {
    return {
      icon: "material-symbols:wifi-off-rounded",
      iconClass: "text-secondary-red-600",
      title: isOnline
        ? "Verification interrupted"
        : "Reconnect to verify payment",
      description:
        "Your payment status has not been changed. Reconnect if necessary, then try verification again.",
    };
  }
  return {
    icon: "material-symbols:error-rounded",
    iconClass: "text-secondary-red-600",
    title: "Payment not confirmed",
    description:
      "We could not verify this transaction. If your account was debited, contact the school with your payment reference.",
  };
};

export default function PaymentCallback() {
  const router = useRouter();
  const isOnline = useOnlineStatus();
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
    enabled: Boolean(reference && token && isOnline),
    retry: 2,
  });

  const returnUrl = token ? `/pay/${token}` : "/";
  if ((verificationQuery.isLoading && isOnline) || !router.isReady) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-neutral-300 p-6">
        <Spinner />
        <div className="text-center">
          <p className="font-semibold text-Text-high-emphasis">
            Confirming your payment
          </p>
          <p className="mt-1 text-sm text-Text-meduim-emphasis">
            Please keep this page open.
          </p>
        </div>
      </main>
    );
  }

  const isSuccessful = verificationQuery.data?.status === "success";
  const needsRetry = !isOnline || verificationQuery.isError;
  const callbackContent = getCallbackContent({
    isSuccessful,
    needsRetry,
    isOnline,
    receiptNumber: verificationQuery.data?.receipt_number,
  });
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-300 p-6">
      <section className="w-full max-w-md rounded-lg border border-border-colour-light bg-white p-6 text-center sm:p-8">
        <Icon
          icon={callbackContent.icon}
          className={`mx-auto text-6xl ${callbackContent.iconClass}`}
        />
        <h1 className="mt-4 text-2xl font-bold">{callbackContent.title}</h1>
        <p className="mt-2 text-sm text-Text-meduim-emphasis">
          {callbackContent.description}
        </p>
        {reference && (
          <p className="mt-3 break-all rounded-lg bg-neutral-300 p-2 text-xs text-Text-meduim-emphasis">
            Reference: {reference}
          </p>
        )}
        <div className="mt-6 flex flex-col gap-2">
          {needsRetry && (
            <button
              type="button"
              disabled={!isOnline || verificationQuery.isFetching}
              onClick={() => void verificationQuery.refetch()}
              className="rounded-lg bg-primary-purple-700 px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {verificationQuery.isFetching
                ? "Verifying..."
                : "Try verification again"}
            </button>
          )}
          <Link
            href={returnUrl}
            className={`inline-block rounded-lg px-5 py-3 font-semibold ${
              needsRetry
                ? "border border-border-colour-light text-Text-high-emphasis"
                : "bg-primary-purple-700 text-white"
            }`}
          >
            View invoice
          </Link>
        </div>
      </section>
    </main>
  );
}
