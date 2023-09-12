import React from "react";
import { BlackRepoIcon } from "../assets/BlackRepoIcon";
import { WhiteRepoIcon } from "../assets/WhiteRepoIcon";

interface PropsType {
  size?: number;
}

export const Logo = ({ size }: PropsType) => {
  return (
    <div className="flex items-center gap-[2.78px] text-title2">
      <BlackRepoIcon size={size} />
      Repo
    </div>
  );
};

export const WhiteLogo = ({ size }: PropsType) => {
  return (
    <div className="flex items-end h-[18px] gap-[2.78px] text-gray50">
      <WhiteRepoIcon size={16.67} />
      <p className="h-[17.23px] text-[17.79px] font-semibold">Repo</p>
    </div>
  );
};
