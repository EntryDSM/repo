import React, { ChangeEvent, useState } from "react";
import { Preview } from "../assets/Preview";
import { NonPreview } from "../assets";

interface PropsType {
  kind?: "text" | "password" | "button";
  times?: string;
  name: string;
  label: string;
  value: number | string;
  onChagne: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  successMsg?: string;
  errorMsg?: string;
}

export const Input = ({
  kind = "text",
  times,
  label,
  name,
  value,
  onChagne,
  errorMsg,
  successMsg,
}: PropsType) => {
  const [open, setOpen] = useState<boolean>(false);
  const EyeIcon = open ? Preview : NonPreview;
  const PasswordTypeChange = () => setOpen(!open);

  const borderError = errorMsg ? "error" : "gray900";
  const borderFocus = kind === "button" ? "" : "focus-within:border-blue";
  const isPassword = kind === "password" && !open;
  return (
    <div className="relative">
      <div className="text-body8 mb-2.5 ml-[7px]">{label}</div>
      <div className="absolute top-[1px] right-[7px] text-body7">{times}</div>
      <div
        className={`flex items-center bg-gray50 rounded border-2 h-[46px] border-${borderError} pl-5 ${borderFocus}`}
      >
        <input
          type={isPassword ? "password" : "text"}
          name={name}
          value={value}
          onChange={onChagne}
          className={"w-full h-full focus:outline-none py-3 text-body7"}
        />
        {!borderFocus && (
          <div
            className={`flex items-center bg-${borderError} h-full px-[18px] text-gray50 text-body8`}
          >
            {kind}
          </div>
        )}
        {isPassword && (
          <div onClick={PasswordTypeChange} className="">
            <EyeIcon size={24} />
          </div>
        )}
      </div>
      {successMsg && <div className="text-body7 text-green">{successMsg}</div>}
      {errorMsg && <div className="text-body7 text-error">{errorMsg}</div>}
    </div>
  );
};
