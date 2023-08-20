import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { Button } from "@/components/ui/button";
import { HOME_PAGE } from "@/config/links";

export default function FormSection() {
  const router = useRouter();

  function goToDashboard() {
    router.push("/dashboard");
  }
  return (
    <section className="mx-auto space-y-7 max-w-[450px]">
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
          htmlFor="personal-id"
          className="text-step--2 text-Text-high-emphasis font-semibold"
        >
          Staff ID
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
            type="text"
            placeholder="Your personal ID"
            className="pl-11 border-border-colour-light placeholder:text-Text-meduim-emphasis py-3 border w-full rounded-md"
            id="personal-id"
          />
        </div>
        <label
          htmlFor="password"
          className="text-step--2 text-Text-high-emphasis placeholder:text-Text-meduim-emphasis  mt-5 font-semibold"
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
          />
        </div>
        <div className="flex justify-between mt-7 flex-wrap gap-2">
          <div className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="check" id="check" />
            <label htmlFor="check">Remember me for this device</label>
          </div>
          <Link href={HOME_PAGE} className="text-primary-purple-600 text-sm">
            Forgot Password?
          </Link>
        </div>
        <button
          onClick={goToDashboard}
          className="bg-primary-purple-500 py-4 text-white rounded-lg mt-4 active:scale-90 transition-all"
        >
          Sign in
        </button>
      </div>
    </section>
  );
}
