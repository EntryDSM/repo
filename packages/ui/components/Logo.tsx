import React from "react";
import { BlackRepoIcon } from "../assets/BlackRepoIcon";
import { WhiteRepoIcon } from "../assets/WhiteRepoIcon";

interface PropsType {
  size?: number;
}

export const Logo = ({ size }: PropsType) => {
  return (
    <div className="flex items-center gap-2 text-title2">
      <BlackRepoIcon size={size} />
      REPO
    </div>
  );
};

export const WhiteLogo = ({ size }: PropsType) => {
  return (
    <div className="flex items-center gap-2 text-body4 text-gray50">
      <WhiteRepoIcon size={size} />
      REPO
    </div>
  );
};
