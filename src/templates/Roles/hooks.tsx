import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NotificationInstance } from "antd/es/notification/interface";

import { axiosInstance } from "@/api";

export type PermissionFlags = {
  create: boolean;
  view: boolean;
  edit: boolean;
  delete: boolean;
};

export const MODULE_KEYS = [
  "dashboard",
  "staff",
  "students",
  "subjects",
  "classes",
  "teachers",
  "hostels",
  "lesson_plan",
  "time_table",
  "results",
  "administration",
  "payroll",
  "roles",
] as const;

export type ModuleKey = (typeof MODULE_KEYS)[number];

export const MODULE_LABELS: Record<ModuleKey, string> = {
  dashboard: "Dashboard",
  staff: "Staff",
  students: "Students",
  subjects: "Subjects",
  classes: "Classes",
  teachers: "Teachers",
  hostels: "Hostels",
  lesson_plan: "Lesson Plan",
  time_table: "Timetable",
  results: "Results",
  administration: "Administration",
  payroll: "Payroll",
  roles: "Roles",
};

export const emptyPermissions = (): Record<ModuleKey, PermissionFlags> => {
  const defaultFlags = { create: false, view: false, edit: false, delete: false };
  return MODULE_KEYS.reduce(
    (acc, key) => ({ ...acc, [key]: { ...defaultFlags } }),
    {} as Record<ModuleKey, PermissionFlags>
  );
};

export type RolePayload = {
  name: string;
  description?: string;
} & Partial<Record<ModuleKey, PermissionFlags>>;

export type RoleRecord = {
  _id: string;
  name: string;
  description?: string;
  staff_count: number;
  createdAt: string;
} & Partial<Record<ModuleKey, PermissionFlags>>;

const fetchAllRoles = () => axiosInstance.get("/roles").then(res => res.data);

export const useAllRoles = () => {
  return useQuery<RoleRecord[]>({
    queryKey: ["allRoles"],
    queryFn: fetchAllRoles,
  });
};

export function useCreateRole(toast: NotificationInstance) {
  const queryClient = useQueryClient();

  const { mutate: createRole, isPending: isCreatingRole } = useMutation({
    mutationFn: (data: RolePayload) => {
      return axiosInstance.post("/roles", data).then(res => res.data);
    },
    onSuccess: () => {
      toast.open({
        message: (
          <h3 className="text-secondary-green-600 font-semibold">
            Success!
          </h3>
        ),
        description: "Role has been created successfully",
        duration: 3,
        className: "ant-toast",
      });
      queryClient.invalidateQueries({ queryKey: ["allRoles"] });
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

  return { createRole, isCreatingRole };
}

export function useUpdateRole(toast: NotificationInstance) {
  const queryClient = useQueryClient();

  const { mutate: updateRole, isPending: isUpdatingRole } = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: RolePayload;
    }) => {
      return axiosInstance.put(`/roles/${id}`, data).then(res => res.data);
    },
    onSuccess: () => {
      toast.open({
        message: (
          <h3 className="text-secondary-green-600 font-semibold">
            Success!
          </h3>
        ),
        description: "Role has been updated successfully",
        duration: 3,
        className: "ant-toast",
      });
      queryClient.invalidateQueries({ queryKey: ["allRoles"] });
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

  return { updateRole, isUpdatingRole };
}

export function useDeleteRole(toast: NotificationInstance) {
  const queryClient = useQueryClient();

  const { mutate: deleteRole } = useMutation({
    mutationFn: (id: string) => {
      return axiosInstance.delete(`/roles/${id}`).then(res => res.data);
    },
    onSuccess: () => {
      toast.open({
        message: (
          <h3 className="text-secondary-green-600 font-semibold">
            Success!
          </h3>
        ),
        description: "Role has been removed",
        duration: 3,
        className: "ant-toast",
      });
      queryClient.invalidateQueries({ queryKey: ["allRoles"] });
    },
    onError: (error: Error & { response?: { data: string } }) => {
      toast.open({
        message: (
          <h3 className="text-secondary-red-600 font-semibold">Error!</h3>
        ),
        description:
          error.response?.data ?? "Couldn't remove this role. Try again.",
        duration: 8,
        className: "ant-toast",
      });
    },
  });

  return { deleteRole };
}

export type InviteStaffPayload = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  permission: string;
};

export function useInviteStaff(toast: NotificationInstance) {
  const { mutate: inviteStaff, isPending: isInvitingStaff } = useMutation({
    mutationFn: (data: InviteStaffPayload) => {
      return axiosInstance.post("/accounts/invite", data).then(res => res.data);
    },
    onSuccess: () => {
      toast.open({
        message: (
          <h3 className="text-secondary-green-600 font-semibold">
            Success!
          </h3>
        ),
        description: "Account created. Share the email and password with them directly.",
        duration: 6,
        className: "ant-toast",
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

  return { inviteStaff, isInvitingStaff };
}
