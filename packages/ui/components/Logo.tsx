import React from "react";
import { BlackRepoIcon } from "../assets/BlackRepoIcon";
import { WhiteRepoIcon } from "../assets/WhiteRepoIcon";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2 text-title1">
      <BlackRepoIcon />
      REPO
    </div>
  );
};

export const WhiteLogo = () => {
  return (
    <div className="flex items-center gap-2 text-title1 text-gray50">
      <WhiteRepoIcon />
      REPO
    </div>
  );
};
