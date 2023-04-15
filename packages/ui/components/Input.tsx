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
  "rounded w-full h-[46px] pl-5 pr-[60px] focus:outline-none py-3";
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
    <div className={`relative ${className}`}>
      {label && <div className="text-body8 pb-2 pl-2">{label}</div>}
      <div className="absolute top-[1px] right-[7px] text-body7">{times}</div>
      <input
        type={isPassword ? isOpenText : "text"}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={`${
          isCustom
            ? `w-full bg-transparent text-body6 focus:border-2`
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
      <div className="mr-5 absolute top-[11px] right-0">
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
