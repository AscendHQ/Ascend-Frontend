import React from "react";
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

import { Button } from "@/components/ui/button";
import { InputWithIcon, TextAreaWithIcon } from "@/templates/Contact-us";
import { contactInfoType } from "@/templates/Contact-us/contact-schema";

type ContactFormType = {
  onSubmit: SubmitHandler<contactInfoType>;
  register: UseFormRegister<contactInfoType>;
  errors: FieldErrors<contactInfoType>;
  handleSubmit: UseFormHandleSubmit<contactInfoType, undefined>;
};

function ContactForm({
  onSubmit,
  register,
  errors,
  handleSubmit,
}: ContactFormType) {
  return (
    <form className="space-y-4 flex-[4]" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-2xl font-bold text-center">Just say hi!</h3>
      <InputWithIcon
        icon="ic:round-person-outline"
        placeholder="Full name"
        id="full_name"
        errorMessage={errors?.full_name?.message || ""}
        register={register}
      />
      <InputWithIcon
        icon="mi:email"
        placeholder="Email address"
        id="email_address"
        errorMessage={errors?.email_address?.message || ""}
        register={register}
      />
      <InputWithIcon
        icon="iconamoon:phone-light"
        placeholder="Phone number"
        id="phone_number"
        errorMessage={errors?.phone_number?.message || ""}
        register={register}
      />
      <InputWithIcon
        icon="ic:baseline-short-text"
        placeholder="Subject"
        id="subject"
        errorMessage={errors?.subject?.message || ""}
        register={register}
      />
      <TextAreaWithIcon
        icon="ph:chat-text"
        placeholder="Message"
        id="message"
        errorMessage={errors?.message?.message || ""}
        register={register}
      />

      <Button variant="primary" styles="mx-auto block" type="submit">
        Send
      </Button>
    </form>
  );
}

export default ContactForm;
