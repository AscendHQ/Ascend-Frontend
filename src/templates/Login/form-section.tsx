/* eslint-disable jsx-a11y/label-has-for */
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";

export default function FormSection() {
  type UserRole = "staff" | "admin";
  const [whoIsLoggingIn, setwhoIsLoggingIn] = React.useState<UserRole>("staff");
  return (
    <section className="mx-auto space-y-7 max-w-[450px]">
      <Link href="/">
        <Image
          src="/Ascend-Logo.svg"
          alt="Ascend Logo"
          width={100}
          height={24}
          className="relative z-50"
        />
      </Link>
      <div>
        <h2 className="text-step-2 font-bold">Welcome Back 👋</h2>
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
      <div className="flex w-full gap-10">
        <button
          className={`${
            whoIsLoggingIn === "admin"
              ? "bg-primary-purple-100 border-primary-purple-500 border-2 text-primary-purple-500"
              : "bg-bgColour-variant-2 text-Text-high-emphasis border-2 border-bgColour-variant-2"
          }  flex-1 rounded-lg p-6 transition-all font-medium`}
          onClick={() => setwhoIsLoggingIn("admin")}
        >
          As an Admin
        </button>
        <button
          className={`${
            whoIsLoggingIn === "staff"
              ? "bg-primary-purple-100 border-primary-purple-500 border-2 text-primary-purple-500"
              : "bg-bgColour-variant-2 text-Text-high-emphasis border-2 border-bgColour-variant-2"
          }  flex-1 rounded-lg p-6 transition-all font-medium`}
          onClick={() => setwhoIsLoggingIn("staff")}
        >
          As a Staff
        </button>
      </div>
      <NewFunction whoIsLoggingIn={whoIsLoggingIn} />
    </section>
  );
}
function NewFunction({ whoIsLoggingIn }: { whoIsLoggingIn: string }) {
  return (
    <div className="grid">
      <label
        htmlFor="personal-id"
        className="text-step--2 text-Text-high-emphasis font-semibold"
      >
        {whoIsLoggingIn === "staff" ? "Staff" : "Admin"} ID
      </label>
      <div className="relative">
        <Icon
          icon="fa-solid:id-card"
          fontSize={25}
          className="absolute top-3 left-2 text-Text-high-emphasis"
        />
        <input
          type="text"
          placeholder="Your personal ID"
          className="pl-11 border-border-colour-light py-3 border w-full rounded-md"
          id="personal-id"
        />
      </div>
      <label
        htmlFor="password"
        className="text-step--2 text-Text-high-emphasis  mt-5 font-semibold"
      >
        Password
      </label>
      <div className="relative">
        <Icon
          icon="mdi:password-outline"
          fontSize={25}
          className="absolute top-3 left-2 text-Text-high-emphasis"
        />
        <input
          type="text"
          placeholder="Enter your password"
          className="pl-11 border-border-colour-light py-3 border w-full rounded-md"
          id="password"
        />
      </div>
      <div className="flex justify-between mt-7">
        <div className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="check" id="check" />
          <label htmlFor="check">Remember me for this device</label>
        </div>
        <Link href="/" className="text-primary-purple-600 text-sm">
          Forgot Password?
        </Link>
      </div>
      <button className="bg-primary-purple-500 py-4 text-white rounded-lg mt-4">
        Sign in
      </button>
    </div>
  );
}
