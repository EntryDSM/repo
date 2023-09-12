import React, { ChangeEvent, KeyboardEvent, ReactNode, useState } from "react";
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
  placeholder: string;
  successMsg?: string;
  errorMsg?: string;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const defaultInputStyle =
  "w-full h-[46px] pl-5 focus:outline-none py-3 rounded";
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
  onKeyDown,
  errorMsg,
  successMsg,
}: PropsType) => {
  const [open, setOpen] = useState<boolean>(false);
  const EyeIcon = open ? Preview : NonPreview;
  const PasswordTypeChange = () => setOpen(!open);

  const borderError = errorMsg ? "border-error" : "border-gray900";
  const borderFocus = kind !== "button" && "focus-within:border-blue";
  const isPassword = kind === "password";
  const isOpenText = !open ? "password" : "text";
  const isCustom = kind === "custom";
  return (
    <div className={`relative ${className}`}>
      {label && <p className="text-body8 pb-2 pl-2">{label}</p>}
      <div className="absolute top-[1px] right-[7px] text-body7">{times}</div>
      <input
        type={isPassword ? isOpenText : "text"}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className={`${
          isCustom
            ? `w-full text-body6 focus:border-2  focus:pl-[18px]`
            : `flex items-center text-body7 border-2 ${borderError} ${borderFocus}`
        } 
        ${isPassword ? "pr-[60px]" : "pr-5"}
         ${defaultInputStyle}  ${className}`}
      />
      {!borderFocus && (
        <div
          className={`flex items-center bg-${borderError} h-full px-[18px] text-gray50 text-body8`}
        >
          {kind}
        </div>
      )}
      <div
        className={`mr-5 absolute ${
          isPassword ? "top-[40px]" : "top-[11px]"
        } right-0`}
      >
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
