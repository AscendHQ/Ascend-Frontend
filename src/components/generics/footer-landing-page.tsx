import Image from "next/image";
import { Container } from "../ui/container";
import { Icon } from "@iconify/react";
import { Button } from "../ui/button";

export default function Footer({ date }: { date: Date }) {
  return (
    <footer>
      <div className="bg-neutral-100 py-10">
        <Container>
          <section className="flex flex-wrap gap-5 justify-between">
            <div className="">
              <Image
                src="/Ascend-Logo.svg"
                alt="Vercel Logo"
                width={100}
                height={24}
                priority
              />
              <p className="max-w-sm text-gray-600 mt-8">
                Transforming school administration into a streamlined and
                hassle-free process.
              </p>
            </div>
            <div className="">
              <h4 className="text-gray-500 mb-3">Company</h4>
              <ul>
                {["About us", "Careers", "Solutions", "Contact"].map((item) => (
                  <li key={item} className="text-gray-600">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="">
              <h4 className="text-gray-500 mb-3">Legal</h4>
              <ul>
                {["Terms", "Privacy", "Media kit"].map((item) => (
                  <li key={item} className="text-gray-600">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full">
              <h4>Subscribe to our newsletter</h4>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full rounded-md md:min-w-[370px] py-5"
                />
                <Button
                  variant="primary"
                  className="text-white absolute right-3 top-3 px-6 py-2"
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </section>
        </Container>
      </div>
      <div className="bg-grey-50 py-5">
        <Container>
          <div className="flex items-center flex-wrap gap-5 justify-between">
            <p>
              © {date.getFullYear()} AscendTechnologies. All rights reserved.
            </p>
            <div className="flex gap-2">
              <Icon
                icon="ri:twitter-fill"
                className="text-gray-400"
                fontSize={30}
              />
              <Icon
                icon="mdi:linkedin"
                className="text-gray-400"
                fontSize={30}
              />
              <Icon
                icon="fa6-brands:facebook"
                className="text-gray-400"
                fontSize={30}
              />
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
