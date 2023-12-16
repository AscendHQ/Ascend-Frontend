import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
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
      <div className="flex flex-col-reverse lg:flex-row w-[90%] mx-auto gap-10 max-w-[79rem] py-7">
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
        <div className="flex-[2]">
          <h3 className="text-2xl text-center font-bold">Get in touch</h3>
          <p className="text-center my-3 text-sm max-w-2xl mx-auto md:text-base">
            Ready to spice things up? Give us a shout, and let's cook up some
            extraordinary solutions for your school management needs
          </p>
          <a
            href="https://wa.link/sqhkr6"
            className="flex items-center gap-2 my-4"
            target="_blank"
          >
            <Icon
              icon="ic:sharp-whatsapp"
              width={25}
              height={25}
              color="#60D669"
            />
            <span className="underline">Chat with us instantly here.</span>
          </a>
          <a
            href="mailto:eniolayodeji@gmail.com"
            className="flex items-center gap-2"
            target="_blank"
          >
            <Icon icon="mi:email" width={25} height={25} />
            <span className="underline">Reach us via email inquiry.</span>
          </a>
          <h4 className="text-xl font-medium mt-6">Follow us on</h4>
          <div className="flex gap-3 mt-2">
            <Icon icon="bi:twitter" width={25} height={25} />
            <Icon icon="bi:facebook" width={25} height={25} />
            <Icon icon="bi:instagram" width={25} height={25} />
            <Icon icon="bi:linkedin" width={25} height={25} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ContactUs;
