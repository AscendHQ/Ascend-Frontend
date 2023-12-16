import { Icon } from "@iconify/react";

function ContactDetails() {
  return (
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
        <Icon icon="ic:sharp-whatsapp" width={25} height={25} color="#60D669" />
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
  );
}

export default ContactDetails;
