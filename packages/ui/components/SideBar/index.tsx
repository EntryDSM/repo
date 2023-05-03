import React, { ReactNode, useState } from "react";
import { WhiteRepoIcon } from "../../assets/WhiteRepoIcon";
import { Home, Setting, Stack } from "../../assets";
import { Sharing } from "./Sharing";
import { Students } from "./Students";

interface Props {
  preview?: boolean;
  children: ReactNode;
}

export const SideBar = ({ preview, children }: Props) => {
  const [side, setSide] = useState<number>(0);
  const onClick = (to: number) => setSide(to === side ? 0 : to);
  return (
    <div className="flex h-[100vh]">
      <div className="fixed bottom-0 top-0 flex">
        <div className=" bg-gray800 w-20 flex gap-10 flex-col items-center pt-10">
          <div>
            <WhiteRepoIcon />
          </div>
          <Home onClick={() => setSide(0)} />
          {!preview && (
            <>
              <Setting onClick={() => setSide(1)} />
              <Stack onClick={() => setSide(2)} />
            </>
          )}
        </div>
        {!preview && (
          <div className="bg-gray700 w-60 text-gray50 pl-6 pr-6 pt-10">
            {
              {
                0: <Students />,
                1: <Sharing />,
              }[side]
            }
          </div>
        )}
      </div>
      {!preview && <div className="w-[320px]" />}
      <div className="flex-auto">{children}</div>
    </div>
  );
};
