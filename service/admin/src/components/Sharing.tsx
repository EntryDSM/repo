import { Dispatch, SetStateAction } from "react";
import { Selected, UnSelected } from "../../../../packages/ui/assets";
import { Button } from "../../../../packages/ui";
import { documentShare, documentUnShare } from "@/apis/document/post/shard";

const sharingButton = [
  { text: "비공개", button_Status: "CREATED SUBMITTED" },
  { text: "공개", button_Status: "SHARED" },
];

interface PropsType {
  name?: string;
  document_id: string;
  shared: boolean;
  pdfView: Dispatch<SetStateAction<boolean>>;
  changeSharing: () => void;
}

export const Sharing = ({
  name,
  document_id,
  shared,
  pdfView,
  changeSharing,
}: PropsType) => {
  const share = shared
    ? () => documentUnShare(document_id)
    : () => documentShare(document_id);

  return (
    <>
      <p className="text-title4">{name}</p>
      <div className="flex flex-col gap-[10px] mt-6">
        <p className="text-body5">문서 공개 설정</p>
        {sharingButton.map(({ text, button_Status }) => {
          const includeShare = button_Status.includes(
            shared ? "SHARED" : "SUBMITTED"
          );
          const onClick = () => {
            if (!includeShare) {
              share();
              changeSharing();
            }
          };
          return (
            <button
              key={text}
              onClick={onClick}
              className=" bg-gray600 rounded-md text-body6 px-3 py-[14px] flex items-center justify-between"
            >
              {text}
              {includeShare ? <Selected /> : <UnSelected />}
            </button>
          );
        })}
      </div>
      <p className="text-body5 mt-6 mb-[10px]">내보내기</p>
      <Button
        onClick={() => pdfView(true)}
        kind="outlineWhite"
        className="w-full"
      >
        PDF로 내보내기
      </Button>
    </>
  );
};
