import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Footer, Header } from "@/components/common";
import { Button } from "@/components/ui/button";
import {
  ContactIntroSection,
  contactSchema,
  FormData,
  InputWithIcon,
  TextAreaWithIcon,
} from "@/templates/Contact-us";

function ContactUs() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormData>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    reset({
      email_address: "",
      full_name: "",
      message: "",
      phone_number: "",
      subject: "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmit: SubmitHandler<FormData> = data => {
    // Log the form data
    console.log(data);
    // Add your further processing logic here
  };

  return (
    <div className="font-GTWalsheimPro">
      <div className="bg-purple-100">
        <Header />
        <ContactIntroSection />
      </div>
      <form
        className="max-w-lg mx-auto space-y-4 my-7 w-[90%]"
        onSubmit={handleSubmit(onSubmit)}
      >
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
      <Footer />
    </div>
  );
}

export default ContactUs;
