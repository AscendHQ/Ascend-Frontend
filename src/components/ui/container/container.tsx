import React from "react";

type Props = {
  children: JSX.Element;
};

export default function Container({ children }: Props) {
  return <div className="max-w-[79rem] mx-auto w-[90%]">{children}</div>;
}
