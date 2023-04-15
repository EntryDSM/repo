import React, { ChangeEvent, ReactNode, useState } from "react";
import { Preview } from "../assets/Preview";
import { NonPreview } from "../assets";

interface PropsType {
  className?: string;
  kind?: "text" | "password" | "button";
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

export const Input = ({
  className,
  kind = "text",
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
  return (
    <div className={"relative" + className}>
      <div className="text-body8 mb-2.5 ml-[7px]">{label}</div>
      <div className="absolute top-[1px] right-[7px] text-body7">{times}</div>
      <div
        className={`flex items-center bg-gray50 rounded border-2 h-[46px] border-${borderError} pl-5 ${borderFocus}`}
      >
        <input
          type={isPassword ? isOpenText : "text"}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={"w-full h-full focus:outline-none py-3 text-body7"}
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
      </div>
      {successMsg && <div className="text-body7 text-green">{successMsg}</div>}
      {errorMsg && <div className="text-body7 text-error">{errorMsg}</div>}
    </div>
  );
};

export const LabelInput = (args: PropsType) => {
  return <Input {...args} />;
};
