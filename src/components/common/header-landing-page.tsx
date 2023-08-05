import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { menuData } from "@/config";

import { Container } from "../ui/container";

function Header({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isScrolled, setIsScrolled] = React.useState(false);

  const genericHamburgerLine =
    "h-1 w-full my-1 rounded-full bg-black transition ease transform duration-300";

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.classList.add("disable-scroll");
    } else {
      document.body.classList.remove("disable-scroll");
    }
  };
  const handleScroll = () => {
    if (window.scrollY > 20) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    document.body.classList.remove("disable-scroll");

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={`fixed w-full z-[999] bg-white ${
        isScrolled ? "bg-opacity-80 shadow-lg backdrop-blur" : "bg-opacity-0"
      } transition-all`}
    >
      <Container>
        <header className="flex items-center justify-between gap-3 py-7">
          <Image
            src="/Ascend-Logo.svg"
            alt="Ascend Logo"
            width={100}
            height={24}
            priority
            className="relative z-50"
          />
          <nav
            className={classNames(
              "fixed inset-0 z-40 bg-white lg:bg-transparent lg:w-[65%] lg:relative px-10 pt-24 lg:p-0 items-center flex flex-col-reverse lg:flex-row justify-end lg:justify-between gap-5 transition-all duration-300",
              { "move-out": isOpen },
              { "move-in": !isOpen }
            )}
          >
            <ul className="flex flex-col w-full lg:flex-row lg:items-center gap-9">
              {menuData.slice(0, -2).map(item => (
                <li key={item.title} className="font-medium whitespace-nowrap">
                  <Link href={item.to}>{item.title}</Link>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col-reverse w-full lg:flex-row lg:items-center justify-end gap-9">
              {menuData.slice(-2).map((item, index) => (
                <li key={item.title} className="font-medium">
                  <Link
                    href={item.to}
                    className={`${
                      index === 1
                        ? "bg-primary-purple-500 text-white  lg:bg-grey-100 lg:text-accent-300 border-2 px-4 py-2 border-accent-300 lg:border-border-colour-light rounded-md shadow-[4px_4px_0px_0px_#000000] hover:shadow-none transition-all flex items-center gap-2"
                        : ""
                    }`}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <button
            className=" flex flex-col h-10 w-8 rounded justify-center relative z-50 items-center group lg:hidden"
            onClick={toggleMenu}
          >
            <span
              className={`${genericHamburgerLine} ${
                isOpen
                  ? "rotate-45 translate-y-3 group-hover:opacity-100"
                  : "group-hover:opacity-100"
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
                  ? "-rotate-45 -translate-y-3 group-hover:opacity-100"
                  : "group-hover:opacity-100"
              }`}
            />
          </button>
        </header>
      </Container>
    </div>
  );
}

export default Header;
