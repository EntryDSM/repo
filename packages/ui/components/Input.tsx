import React, { ChangeEvent, ReactNode, useState } from "react";
import { Preview } from "../assets/Preview";
import { NonPreview } from "../assets";

interface PropsType {
  className?: string;
  kind?: "text" | "password" | "button" | "custom";
  times?: string;
  activeIcon?: ReactNode;
  name?: string;
  label?: string;
  value: number | string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  successMsg?: string;
  errorMsg?: string;
}

const defaultInputStyle =
  "rounded w-full h-[46px] pl-5 focus:outline-none py-3";
const defaultHintStyle = "absolute text-body7";

export const Input = ({
  className = "bg-gray100",
  kind = "custom",
  times,
  label,
  name,
  value,
  activeIcon,
  placeholder,
  onChange,
  errorMsg,
  successMsg,
}: PropsType) => {
  const [open, setOpen] = useState<boolean>(false);
  const EyeIcon = open ? Preview : NonPreview;
  const PasswordTypeChange = () => setOpen(!open);

  const borderError = errorMsg ? "error" : "gray900";
  const borderFocus = kind === "button" ? "" : "focus-within:border-blue";
  const isPassword = kind === "password";
  const isOpenText = !open ? "password" : "text";
  const isCustom = kind === "custom";
  return (
    <div className="relative w-full">
      <div className="absolute text-body8 -top-[31px] left-[7px]">{label}</div>
      <div className="absolute top-[1px] right-[7px] text-body7">{times}</div>
      <input
        type={isPassword ? isOpenText : "text"}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={`${
          isCustom
            ? `${className} text-body6 focus:border-2`
            : `flex items-center text-body7 bg-gray50 border-2 border-${borderError} ${borderFocus}`
        } 
         ${defaultInputStyle}`}
      />
      {!borderFocus && (
        <div
          className={`flex items-center bg-${borderError} h-full px-[18px] text-gray50 text-body8`}
        >
          {kind}
        </div>
      )}
      <div className="mr-5">
        {isPassword && (
          <div onClick={PasswordTypeChange}>
            <EyeIcon size={24} />
          </div>
        )}
        {activeIcon}
      </div>

      {successMsg && (
        <div className={`${defaultHintStyle} text-green`}>{successMsg}</div>
      )}
      {errorMsg && (
        <div className={`${defaultHintStyle} text-error`}>{errorMsg}</div>
      )}
    </div>
  );
};

export const LabelInput = (args: PropsType) => {
  return (
    <div className="flex justify-between">
      <Input {...args} />
    </div>
  );
};
