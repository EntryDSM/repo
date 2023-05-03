import React, { useState } from "react";
import { Button } from "../Button";

export const Sharing = () => {
  const [state, setState] = useState<boolean>(false);
  return (
    <>
      <div className="text-title4">1316 장지성</div>

      <div className="flex flex-col gap-[10px] mt-6">
        <div className="text-body5">문서 공개 설정</div>
        <div className="h-12 bg-gray400 rounded-md text-body6 flex items-center justify-center">
          비공개
        </div>
        <div className="h-12 bg-gray600 rounded-md text-body6">공개</div>
      </div>

      <div className="text-body5 mt-6 mb-[10px]">내보내기</div>
      <Button kind="containedWhite" className="w-full">
        PDF로 내보내기
      </Button>
    </>
  );
};
