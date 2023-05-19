import { useState } from "react";
import { Selected, UnSelected } from "../../../../packages/ui/assets";
import { Button } from "../../../../packages/ui";
import { documentShare, documentUnShare } from "@/apis/document/post/shard";

const sharingButton = [
  { text: "비공개", button_Status: "CREATED SUBMITTED" },
  { text: "공개", button_Status: "SHARED" },
];

interface PropsType {
  name?: string;
  status: "CREATED" | "SUBMITTED" | "SHARED";
  document_id: string;
}

export const Sharing = ({ name, status, document_id }: PropsType) => {
  const [state, setState] = useState<boolean>(status === "SHARED");
  const share = state
    ? () => documentUnShare(document_id)
    : () => documentShare(document_id);

  console.log(share);
  return (
    <>
      <div className="text-title4">{name}</div>

      <div className="flex flex-col gap-[10px] mt-6">
        <div className="text-body5">문서 공개 설정</div>
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

      <div className="text-body5 mt-6 mb-[10px]">내보내기</div>
      <Button kind="outlineWhite" className="w-full">
        PDF로 내보내기
      </Button>
    </>
  );
};
