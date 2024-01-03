import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Footer, Header } from "@/components/common";
import {
  ContactDetails,
  ContactForm,
  ContactIntroSection,
  contactSchema,
  FormData,
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
    console.log(data);
  };

  return (
    <div className="font-GTWalsheimPro">
      <div className="bg-purple-100">
        <Header title="Contact us" />
        <ContactIntroSection />
      </div>
      <div className="flex flex-col-reverse lg:flex-row w-[90%] mx-auto gap-10 max-w-[79rem] py-7">
        <ContactForm
          onSubmit={onSubmit}
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
        />
        <ContactDetails />
      </div>
      <Footer />
    </div>
  );
}

export default ContactUs;
