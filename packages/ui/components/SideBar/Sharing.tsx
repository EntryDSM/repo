import React, { useState } from "react";
import { Button } from "../Button";
import { Selected, UnSelected } from "../../assets";
import { ShareFnType } from ".";

const sharingButton = [
  { text: "비공개", button_Status: "CREATED SUBMITTED" },
  { text: "공개", button_Status: "SHARED" },
];

interface PropsType {
  name?: string;
  status: "CREATED" | "SUBMITTED" | "SHARED";
  sharingFn: ShareFnType;
}

export const Sharing = ({ status, sharingFn }: PropsType) => {
  const [state, setState] = useState<boolean>(status === "SHARED");
  const share = () => sharingFn(state ? "UNSHARING" : "SHARING");

  return (
    <>
      <p className="text-title4">1316 장지성</p>

      <div className="flex flex-col gap-[10px] mt-6">
        <p className="text-body5">문서 공개 설정</p>
        {sharingButton.map(({ text, button_Status }) => {
          const includeShare = button_Status.includes(
            state ? "SHARED" : "SUBMITTED"
          );
          const onClick = () => {
            try {
              if (!includeShare) {
                share();
                setState(!state);
              }
            } catch (e) {
              throw Error;
            }
          };
          return (
            <div
              onClick={onClick}
              className=" bg-gray600 rounded-md text-body6 px-3 py-[14px] flex items-center justify-between"
            >
              {text}
              {includeShare ? <Selected /> : <UnSelected />}
            </div>
          );
        })}
      </div>

      <p className="text-body5 mt-6 mb-[10px]">내보내기</p>
      <Button kind="outlineWhite" className="w-full">
        PDF로 내보내기
      </Button>
    </>
  );
};
