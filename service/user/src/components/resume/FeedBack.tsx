import { useState } from "react";
import { Arrow, CheckCircle, Info } from "../../../../../packages/ui/assets";
import { Button } from "../../../../../packages/ui";
import { useMutation } from "@tanstack/react-query";
import { ReflrectIdType, feedbackReflrect } from "@/apis/feedback/reflrect";
import { AwardResType } from "@/apis/document/patch/Award";
import { CertificateResType } from "@/apis/document/patch/Certificate";
import { IntroduceResType } from "@/apis/document/patch/Introduce";
import { ProjectResType } from "@/apis/document/patch/Project";
import { WriteInfoResType } from "@/apis/document/patch/WriteInfo";
import { EachStateType } from "@/hooks/useWriteProfile";
import { toast } from "react-toastify";

interface PropsType {
  document_id?: string;
  element_id: string | null;
  content: string;
}

export const FeedBack = ({
  document_id = "",
  element_id,
  content,
}: PropsType) => {
  const [close, setClose] = useState<boolean>(true);
  const { mutate } = useMutation(
    () => feedbackReflrect({ document_id, element_id }),
    {
      onSuccess: () => {
        toast("피드백이 반영되었습니다", { type: "success", autoClose: 1000 });
      },
    }
  );
  const reflrectonClick = () => {
    setClose(false);
    mutate();
  };
  return (
    <>
      {close && document_id && element_id && content && (
        <div
          className={`w-full rounded-md border-2 border-focus p-10 flex flex-col gap-5 text-focus`}
        >
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[10px] [&_path]:fill-focus text-body5">
                <Info size={20} />
                피드백
              </div>
            </div>
            <p className="text-body7 whitespace-pre-wrap">{content}</p>
          </div>

          {close && (
            <Button kind="point" onClick={reflrectonClick}>
              <CheckCircle size={18} />
              피드백 반영
            </Button>
          )}
        </div>
      )}
    </>
  );
};
