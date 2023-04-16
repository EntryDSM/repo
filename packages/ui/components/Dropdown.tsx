import React, { useState } from "react";
import { Arrow } from "../assets/Arrow";
import ReactOutSideClickHandler from "react-outside-click-handler";

type ListObjectType = { [key in string]: string };

interface PropsType<T> {
  kind?: "outline" | "contained";
  label?: string;
  hint?: string;
  name: string;
  lists: T[];
  value?: string;
  onClick: (value: { keyword: T; name: string }) => void;
  objectKey?: string;
  className?: string;
  placeholder: string;
}

const kindColor = {
  outline: "border-2 border-gray-800 bg-transparent",
  contained: "bg-gray100",
};

export const Dropdown = <T extends string | ListObjectType>({
  kind = "outline",
  label,
  hint,
  name,
  lists,
  value,
  onClick,
  objectKey,
  className = "bg-gray100",
  placeholder,
}: PropsType<T>) => {
  const kindCss = kindColor[kind];
  const [dropdown, setDropDown] = useState(false);
  return (
    <ReactOutSideClickHandler
      display="inline-block"
      onOutsideClick={() => {
        setDropDown(false);
      }}
    >
      {label && <div className="mb-2.5 ml-[7px] text-body8">{label}</div>}
      <div className={`${className} relative`}>
        <div
          onClick={() => setDropDown(!dropdown)}
          className={`h-[46px] flex items-center justify-between rounded-sm pl-4 pr-3 ${kindCss} cursor-pointer`}
        >
          <div className={`text-body6 ${value || "text-gray200"}`}>
            {value || placeholder}
          </div>
          <Arrow direction={dropdown ? "top" : "bottom"} />
        </div>

        {dropdown && (
          <div className="absolute z-50 top-14 bg-gray100 rounded-md shadow-xl w-full max-h-[132px] overflow-y-auto flex flex-col items-center">
            {lists.map((keyword, idx) => {
              const isListObject = typeof keyword === "object";
              return (
                <>
                  <div
                    onClick={() => {
                      onClick({ keyword, name });
                      setDropDown(false);
                    }}
                    className="w-full hover:bg-gray200 flex pl-4 py-2.5 items-center rounded cursor-pointer"
                  >
                    {isListObject ? keyword[objectKey as string] : keyword}
                  </div>
                  {idx !== lists.length - 1 && (
                    <div className="w-[95%] h-[1px]  bg-gray50 shrink-0" />
                  )}
                </>
              );
            })}
          </div>
        )}
      </div>
      {hint && <div className="text-body8 text-gray300">{hint}</div>}
    </ReactOutSideClickHandler>
  );
};
