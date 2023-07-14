import React from "react";
import { Container } from "../ui/container";
import Image from "next/image";
import Link from "next/link";
import { menuData } from "@/config";

function Header({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const genericHamburgerLine = `h-1 w-full my-1 rounded-full bg-black transition ease transform duration-300`;

  return (
    <Container>
      <header className="flex items-center justify-between gap-3 py-7">
        <Image
          src="/Ascend-Logo.svg"
          alt="Vercel Logo"
          width={100}
          height={24}
          priority
        />

        <div className="lg:w-[65%] hidden items-center md:flex justify-between gap-5">
          <ul className="flex items-center gap-9">
            {menuData.slice(0, -2).map((item) => (
              <li key={item.title}>
                <Link href={item.to}>{item.title}</Link>
              </li>
            ))}
          </ul>
          <ul className="flex items-center gap-9">
            {menuData.slice(-2).map((item, index) => (
              <li key={item.title}>
                <Link
                  href={item.to}
                  className={`${
                    index === 1
                      ? "bg-grey-100 text-accent-300 border-2 px-4 py-2 border-border-colour-light rounded-md shadow-[4px_4px_0px_0px_#000000] hover:shadow-none transition-all flex items-center gap-2"
                      : ""
                  }`}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <button
          className={` flex flex-col h-10 w-8 rounded justify-center items-center group md:hidden`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={`${genericHamburgerLine} ${
              isOpen
                ? `rotate-45 translate-y-3 group-hover:opacity-100`
                : `group-hover:opacity-100`
            }`}
          />
          <span
            className={`${genericHamburgerLine} ${
              isOpen ? "opacity-0" : "group-hover:opacity-100"
            }`}
          />
          <span
            className={`${genericHamburgerLine} ${
              isOpen
                ? `-rotate-45 -translate-y-3 group-hover:opacity-100`
                : `group-hover:opacity-100`
            }`}
          />
        </button>
      </header>
    </Container>
  );
}

export default Header;
