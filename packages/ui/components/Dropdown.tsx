import React, { useState } from "react";
import { Arrow } from "../assets/Arrow";
import ReactOutSideClickHandler from "react-outside-click-handler";

type ListObjectType = { [key in string]: string };

export const dropdownAll = (keyword: string) =>
  keyword === "전체" ? "" : keyword;

interface PropsType<T, U> {
  kind?: "outline" | "contained";
  roleName?: string;
  label?: string;
  hint?: string;
  name?: U | undefined;
  lists: T[];
  value?: T;
  onClick: (value: { keyword: T; name?: U | undefined }) => void;
  objectKey?: T extends ListObjectType ? keyof T : undefined;
  className?: string;
  placeholder: string;
}

const kindColor = {
  outline: "border-2 border-gray-800 bg-transparent",
  contained: "bg-gray100",
};

export const Dropdown = <
  T extends (string | number) | ListObjectType,
  U extends string
>({
  kind = "outline",
  label,
  roleName = '',
  hint,
  name,
  lists,
  value,
  onClick,
  objectKey,
  className = "bg-gray100",
  placeholder,
}: PropsType<T, U>) => {
  const kindCss = kindColor[kind];
  const [dropdown, setDropDown] = useState(false);
  const valueObject =
    typeof value === "object"
      ? (value[objectKey as string] as string)
      : (value as string | undefined);
  return (
    <ReactOutSideClickHandler
      display="inline-block"
      onOutsideClick={(e) => {
        setDropDown(false);
      }}
    >
      {label && <div className="mb-2.5 ml-[7px] text-body8">{label}</div>}
      <div
        className={`${className} relative`}
        onClick={(e) => e.preventDefault()}
      >
        <div
          onClick={() => setDropDown(!dropdown)}
          className={`h-[46px] flex items-center justify-between rounded-sm pl-4 pr-3 ${kindCss} cursor-pointer`}
        >
          <div className={`text-body6 ${valueObject || "text-gray300"}`}>
            {valueObject ? valueObject + roleName : placeholder}
          </div>
          <Arrow direction={dropdown ? "top" : "bottom"} />
        </div>

        {dropdown && (
          <div className="absolute z-50 top-14 bg-gray100 rounded-sm shadow-xl w-full max-h-[132px] overflow-y-auto flex flex-col items-center">
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
