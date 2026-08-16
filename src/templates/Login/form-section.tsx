import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { useMutation } from "@tanstack/react-query";
import { notification } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { axiosInstance } from "@/api";
import { Button } from "@/components/ui/button";
import LoadingState from "@/components/ui/Loading";
import { DASHBOARD_OVERVIEW, HOME_PAGE } from "@/config/links";
import { formSchema, FormSchemaType } from "@/types/form";
import { setSecureStorage } from "@/utils/localStorage";

export default function FormSection() {
  const router = useRouter();

  const [api, contextHolder] = notification.useNotification();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: (data: FormSchemaType) => {
      return axiosInstance.post("/auth/login", data);
    },
    onSuccess: data => {
      if (!data) {
        api.open({
          message: (
            <h3 className="text-secondary-red-600 font-semibold">
              Login Failed!
            </h3>
          ),
          description:
            "We encountered an unexpected issue during your login attempt. Please try again.",
          duration: 8,
          className: "ant-toast",
        });
        return;
      }
      setSecureStorage(
        "userInfoAccessToken",
        JSON.stringify(data.data.access_token)
      );
      setSecureStorage("userInfoData", JSON.stringify(data.data.account));
      router.push(DASHBOARD_OVERVIEW);
    },
    onError: (error: Error & { response?: { data?: string } }) => {
      api.open({
        message: (
          <h3 className="text-secondary-red-600 font-semibold">Error!</h3>
        ),
        description:
          error.response?.data ??
          "Login failed. Please check your details and try again.",
        duration: 8,
        className: "ant-toast",
      });
    },
    onSettled() {
      reset({
        email: "",
        password: "",
      });
    },
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async data => {
    loginMutation.mutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <section className="mx-auto space-y-7 max-w-[450px]">
      {contextHolder}
      <Link href={HOME_PAGE}>
        <Image
          src="/Ascend-Logo.svg"
          alt="Ascend Logo"
          width={100}
          height={24}
          className="relative z-50"
        />
      </Link>
      <div>
        <h2 className="text-step-2 font-bold mt-14">Welcome Back 👋</h2>

        <p className="text-step--2 !leading-tight mt-3">
          Let's make learning and professional growth effortless and more
          engaging than ever.
        </p>
      </div>
      <Button
        leftElement={<Icon icon="flat-color-icons:google" fontSize={20} />}
        className="flex items-center gap-3 bg-grey-200 text-Text-high-emphasis w-full justify-center py-3 font-inter"
      >
        Continue with google
      </Button>
      <div className="flex items-center gap-3">
        <hr className="flex-1 border-grey-300" />
        <p>or</p>
        <hr className="flex-1 border-grey-300" />
      </div>

      <div className="grid">
        <label
          htmlFor="email_address"
          className="text-step--2 text-Text-high-emphasis mb-1.5 font-semibold"
        >
          Email Address
        </label>
        <div className="relative">
          <Image
            src="/password-check.svg"
            alt="password-check"
            width={25}
            height={25}
            className="absolute top-3 left-2 text-Text-high-emphasis"
          />
          <input
            type="email"
            placeholder="Your email address"
            className="pl-11 border-border-colour-light placeholder:text-Text-meduim-emphasis py-3 border w-full rounded-md"
            id="email_address"
            {...register("email")}
          />
        </div>
        {errors.email && (
          <span className="text-red-800 block text-xs lg:text-sm mt-2">
            {errors.email?.message}
          </span>
        )}
        <label
          htmlFor="password"
          className="text-step--2 text-Text-high-emphasis placeholder:text-Text-meduim-emphasis mb-1.5 mt-5 font-semibold"
        >
          Password
        </label>
        <div className="relative">
          <Image
            src="/lock.svg"
            alt="lock"
            width={25}
            height={25}
            className="absolute top-3 left-2 text-Text-high-emphasis"
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="pl-11 border-border-colour-light py-3 border w-full rounded-md"
            id="password"
            {...register("password")}
          />
        </div>
        {errors.password && (
          <span className="text-red-800 block text-xs lg:text-sm  mt-2">
            {errors.password?.message}
          </span>
        )}
        <button
          onClick={handleSubmit(onSubmit)}
          className={`${
            loginMutation.isPending
              ? "bg-primary-purple-400"
              : "bg-primary-purple-700"
          }  py-4 text-white rounded-lg mt-11 active:scale-90 transition-all flex justify-center items-center`}
        >
          <LoadingState
            label="Sign in"
            isSubmitting={loginMutation.isPending}
          />
        </button>
      </div>
    </section>
  );
}
