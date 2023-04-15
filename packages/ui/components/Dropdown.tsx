import React, { useState } from "react";
import { Arrow } from "../assets/Arrow";

interface PropsType {
  kind?: "outline" | "contained";
  lists: string[];
  value?: string;
  className?: string;
}

const kindColor = {
  outline: "border-2 border-gray-800 bg-gray50",
  contained: "bg-gray100",
};

export const Dropdown = ({
  kind = "outline",
  lists,
  value,
  className,
}: PropsType) => {
  const kindCss = kindColor[kind];
  return (
    <div
      className={`relative h-[46px] flex items-center justify-between rounded-sm pl-4 pr-3 ${kindCss} ${className} cursor-pointer`}
    >
      <div className="text-body6">Select</div>
      <Arrow direction="bottom" />
    </div>
  );
};
