import React, { ReactNode } from "react";
import { WhiteRepoIcon } from "../assets/WhiteRepoIcon";
import { Home } from "../assets";

interface Props {
  children: ReactNode;
}

export const SideBar = ({ children }: Props) => {
  return (
    <div className="flex h-[100vh]">
      <div className="bg-gray800 w-20 flex gap-10 flex-col items-center pt-10">
        <div>
          <WhiteRepoIcon />
        </div>
        <Home />
      </div>
      <div>{children}</div>
    </div>
  );
};
