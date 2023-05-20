import { MutableRefObject, Ref, cloneElement, useState } from "react";
import { Selected, UnSelected } from "../../../../packages/ui/assets";
import { Button } from "../../../../packages/ui";
import { documentShare, documentUnShare } from "@/apis/document/post/shard";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const sharingButton = [
  { text: "비공개", button_Status: "CREATED SUBMITTED" },
  { text: "공개", button_Status: "SHARED" },
];

interface PropsType {
  name?: string;
  status: "CREATED" | "SUBMITTED" | "SHARED";
  document_id: string;
  targetRef?: MutableRefObject<HTMLDivElement | null>;
}

export const Sharing = ({
  name,
  status,
  document_id,
  targetRef,
}: PropsType) => {
  const [state, setState] = useState<boolean>(status === "SHARED");
  const share = state
    ? () => documentUnShare(document_id)
    : () => documentShare(document_id);

  const onClickPdf = () =>
    targetRef && getPdf(targetRef, `대마고 ${name} 이력서`);
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

      <Button onClick={onClickPdf} kind="outlineWhite" className="w-full">
        PDF로 내보내기
      </Button>
    </>
  );
};

export const getPdf = async (
  { current }: MutableRefObject<HTMLElement | null>,
  fileName: string
) => {
  if (!current) return;
  const canvas = await html2canvas(current);
  const imgData = canvas.toDataURL("image/png");

  const imgWidth = 210;
  const pageHeight = 295;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let heightLeft = imgHeight;

  const doc = new jsPDF("p", "mm", "a4", true);
  let position = 0;

  doc.addImage(
    imgData,
    "PNG",
    0,
    position,
    imgWidth,
    imgHeight,
    undefined,
    "FAST"
  );
  heightLeft -= pageHeight;

  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    doc.addPage();
    doc.addImage(
      imgData,
      "PNG",
      0,
      position,
      imgWidth,
      imgHeight,
      undefined,
      "FAST"
    );
    heightLeft -= pageHeight;
  }
  doc.save(fileName + ".pdf");
};
