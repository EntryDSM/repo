import React, { ReactNode } from "react";
import { WhiteRepoIcon } from "../assets/WhiteRepoIcon";
import { Home, Setting, Stack } from "../assets";
import { Button } from "./Button";

interface Props {
  children: ReactNode;
}

export const SideBar = ({ children }: Props) => {
  return (
    <div className="flex h-[100vh]">
      <div className="fixed bottom-0 top-0 flex">
        <div className=" bg-gray800 w-20 flex gap-10 flex-col items-center pt-10">
          <div>
            <WhiteRepoIcon />
          </div>
          <Home />
          <Setting />
          <Stack />
        </div>
        <div className="bg-gray700 w-60 text-gray50 pl-6 pr-6 pt-10">
          <div className="text-title4">1316 장지성</div>

          <div className="flex flex-col gap-[10px] mt-6">
            <div className="text-body5">문서 공개 설정</div>
            <div className="h-12 bg-gray600 rounded-md text-body6">비공개</div>
            <div className="h-12 bg-gray600 rounded-md text-body6">공개</div>
          </div>

          <div className="text-body5 mt-6 mb-[10px]">내보내기</div>
          <Button kind="containedWhite" className="w-full">
            PDF로 내보내기
          </Button>
        </div>
      </div>
      <div className="w-[320px]" />
      <div className="flex-auto">{children}</div>
    </div>
  );
};
