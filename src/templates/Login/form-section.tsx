// import { MehOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { useMutation } from "@tanstack/react-query";
import { notification } from "antd";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import LoadingState from "@/components/ui/Loading";
import { DASHBOARD_OVERVIEW, HOME_PAGE } from "@/config/links";
import { formSchema, FormSchemaType } from "@/types/form";
import { setSecureStorage } from "@/utils/cookieStorage";

export default function FormSection() {
  const [isChecked, setIsChecked] = React.useState(false);

  const router = useRouter();

  const [api, contextHolder] = notification.useNotification();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const loginMutation = useMutation({
    mutationFn: (data: FormSchemaType) => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/login`,
        data
      );
    },
    onSuccess: data => {
      setSecureStorage("userInfo", JSON.stringify(data.data), 30, isChecked);
      router.push(DASHBOARD_OVERVIEW);
    },
    onError: (error: Error & { response: { data: string } }) => {
      console.log(error, "onerror");
      api.open({
        message: (
          <h3 className="text-secondary-red-600 font-semibold">Error!</h3>
        ),
        description: error.response.data,
        duration: 8,
        className: "ant-toast",
      });
    },
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async data => {
    // console.log(data);
    loginMutation.mutate({
      email: data.email,
      password: data.password,
    });
  };

  React.useEffect(() => {
    reset({
      email: "",
      password: "",
    });
  }, [isSubmitSuccessful, reset]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis morbi
          pulvinar venenatis non.
        </p>
      </div>
      <Button
        leftElement={<Icon icon="flat-color-icons:google" fontSize={20} />}
        className="flex items-center gap-3 bg-grey-200 text-Text-high-emphasis w-full justify-center py-3 font-inter"
      >
        Continue with google
      </Button>
      <div className="flex items-center gap-3">
        <hr className="flex-1" />
        <p>or</p>
        <hr className="flex-1" />
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
            type="text"
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
        <div className="flex justify-between mt-7 flex-wrap gap-2">
          <div className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="check"
              id="check"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="check">Remember me for this device</label>
          </div>
          <Link href={HOME_PAGE} className="text-primary-purple-700 text-sm">
            Forgot Password?
          </Link>
        </div>
        <button
          onClick={handleSubmit(onSubmit)}
          className={`${
            isSubmitting ? "bg-primary-purple-400" : "bg-primary-purple-700"
          }  py-4 text-white rounded-lg mt-4 active:scale-90 transition-all`}
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
