import { Icon } from "@iconify/react";

export default function PermissionDeniedState({
  message = "You don't have permission to view this.",
}: {
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-Text-meduim-emphasis">
      <Icon icon="solar:lock-keyhole-bold" fontSize={32} />
      <p>{message}</p>
      <p className="text-sm">
        Ask your school admin if you think this is a mistake.
      </p>
    </div>
  );
}

// Axios error shape - true when the request failed specifically due to
// a permission/auth check (401/403), as opposed to any other failure.
export function isAccessDeniedError(
  error: unknown
): error is { response: { status: number } } {
  const status = (error as { response?: { status?: number } })?.response
    ?.status;
  return status === 401 || status === 403;
}
