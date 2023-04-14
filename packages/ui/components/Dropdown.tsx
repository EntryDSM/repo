import React, { useState } from "react";
import { Arrow } from "../assets/Arrow";

interface PropsType {
  kind?: "outline" | "contained";
  lists: string[];
  value?: string;
}

const kindColor = {
  outline: "border-2 border-gray-800 bg-gray50",
  contained: "bg-gray100",
};

export const Dropdown = ({ kind = "outline", lists, value }: PropsType) => {
  const kindCss = kindColor[kind];
  return (
    <div
      className={`relative w-full h-[46px] flex items-center justify-between rounded-sm pl-4 pr-3  ${kindCss}`}
    >
      <div className="text-body6">Select</div>
      <Arrow direction="top" />

      <div className="absolute w-full top-[52px] left-0 rounded z-10 bg-gray-100">
        <div className="w-full h-[45px] hover:bg-gray-200 pl-4 rounded">
          앙기모띠
        </div>
        <div className="w-[calc(100%-8px)] h-[1px] bg-gray-50 box-border" />
      </div>
    </div>
  );
};
