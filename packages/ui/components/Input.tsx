import React from "react";
import { Preview } from "../assets/Preview";

interface PropsType {
  label: string;
  placeholder: string;
  errorMsg?: string;
}

const Input = ({ label, errorMsg }: PropsType) => {
  return (
    <div className="relative">
      <div className="text-body8 mb-2.5 ml-[7px]">{label}</div>
      <input className="w-full h-11.5 rounded border-2 focus:border-blue focus:border-2 focus:outline-none py-3 px-4 text-body7" />
      <div className="absolute top-[44px] right-[20px]">
        <Preview size={24} />
      </div>
      {errorMsg && <div className="text-body7">{errorMsg}</div>}
    </div>
  );
};

export default Input;
