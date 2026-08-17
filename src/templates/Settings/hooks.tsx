import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NotificationInstance } from "antd/es/notification/interface";

import { axiosInstance } from "@/api";
import { getSecureStorage, setSecureStorage } from "@/utils/localStorage";

type StoredUserInfo = {
  _id: string;
  organization: string;
  first_name: string;
  last_name: string;
  email: string;
};

export const getStoredUserInfo = (): StoredUserInfo | undefined =>
  getSecureStorage("userInfoData");

// --- Organization (school) settings ---

export type OrganizationDetail = {
  _id: string;
  name: string;
  description?: string;
  address?: { street?: string; zip_code?: string; country?: string };
  academic_settings?: {
    current_session?: string;
    current_term?: "1st Term" | "2nd Term" | "3rd Term";
    term_length_weeks?: number;
    pass_mark?: number;
  };
};

type UpdateOrganizationPayload = {
  name?: string;
  description?: string;
  address?: { street?: string; zip_code?: string; country?: string };
  academic_settings?: {
    current_session: string;
    current_term: "1st Term" | "2nd Term" | "3rd Term";
    term_length_weeks: number;
    pass_mark: number;
  };
};

const fetchOrganization = (orgId: string) =>
  axiosInstance
    .get(`/organizations/${orgId}`)
    .then(res => res.data as OrganizationDetail);

export const useOrganization = () => {
  const orgId = getStoredUserInfo()?.organization ?? "";

  return useQuery({
    queryKey: ["organizationSettings", orgId],
    queryFn: () => fetchOrganization(orgId),
    enabled: Boolean(orgId),
  });
};

export function useUpdateOrganization(toast: NotificationInstance) {
  const queryClient = useQueryClient();
  const orgId = getStoredUserInfo()?.organization ?? "";

  const { mutate: updateOrganization, isPending: isUpdatingOrganization } =
    useMutation({
      mutationFn: (data: UpdateOrganizationPayload) => {
        return axiosInstance
          .put(`/organizations/${orgId}`, data)
          .then(res => res.data);
      },
      onSuccess: () => {
        toast.open({
          message: (
            <h3 className="text-secondary-green-600 font-semibold">
              Success!
            </h3>
          ),
          description: "School settings have been updated",
          duration: 3,
          className: "ant-toast",
        });
        queryClient.invalidateQueries({
          queryKey: ["organizationSettings", orgId],
        });
      },
      onError: (error: Error & { response?: { data: string } }) => {
        toast.open({
          message: (
            <h3 className="text-secondary-red-600 font-semibold">Error!</h3>
          ),
          description: error.response?.data ?? "Something went wrong",
          duration: 8,
          className: "ant-toast",
        });
      },
    });

  return { updateOrganization, isUpdatingOrganization };
}

// --- Account (personal profile) settings ---

export type AccountProfile = {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
};

const fetchAccountProfile = (accountId: string) =>
  axiosInstance
    .get(`/accounts/${accountId}`)
    .then(res => res.data as AccountProfile);

export const useAccountProfile = () => {
  const accountId = getStoredUserInfo()?._id ?? "";

  return useQuery({
    queryKey: ["accountSettings", accountId],
    queryFn: () => fetchAccountProfile(accountId),
    enabled: Boolean(accountId),
  });
};

export function useUpdateAccountProfile(toast: NotificationInstance) {
  const queryClient = useQueryClient();
  const accountId = getStoredUserInfo()?._id ?? "";

  const { mutate: updateAccountProfile, isPending: isUpdatingAccount } =
    useMutation({
      mutationFn: (data: { first_name: string; last_name: string }) => {
        return axiosInstance
          .put(`/accounts/${accountId}`, data)
          .then(res => res.data);
      },
      onSuccess: response => {
        toast.open({
          message: (
            <h3 className="text-secondary-green-600 font-semibold">
              Success!
            </h3>
          ),
          description: "Your profile has been updated",
          duration: 3,
          className: "ant-toast",
        });
        // keep the locally cached name in sync so it's correct elsewhere in the app
        const stored = getStoredUserInfo();
        if (stored) {
          setSecureStorage(
            "userInfoData",
            JSON.stringify({ ...stored, ...response })
          );
        }
        queryClient.invalidateQueries({
          queryKey: ["accountSettings", accountId],
        });
      },
      onError: (error: Error & { response?: { data: string } }) => {
        toast.open({
          message: (
            <h3 className="text-secondary-red-600 font-semibold">Error!</h3>
          ),
          description: error.response?.data ?? "Something went wrong",
          duration: 8,
          className: "ant-toast",
        });
      },
    });

  return { updateAccountProfile, isUpdatingAccount };
}

// --- Change password ---

export function useChangePassword(toast: NotificationInstance) {
  const { mutate: changePassword, isPending: isChangingPassword } =
    useMutation({
      mutationFn: (data: {
        old_password: string;
        new_password: string;
        confirm_password: string;
      }) => {
        return axiosInstance
          .put("/auth/change_password", data)
          .then(res => res.data);
      },
      onSuccess: () => {
        toast.open({
          message: (
            <h3 className="text-secondary-green-600 font-semibold">
              Success!
            </h3>
          ),
          description: "Your password has been changed",
          duration: 3,
          className: "ant-toast",
        });
      },
      onError: (error: Error & { response?: { data: string } }) => {
        toast.open({
          message: (
            <h3 className="text-secondary-red-600 font-semibold">Error!</h3>
          ),
          description:
            error.response?.data ?? "Couldn't change your password",
          duration: 8,
          className: "ant-toast",
        });
      },
    });

  return { changePassword, isChangingPassword };
}
