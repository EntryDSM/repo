import React, { ChangeEvent, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { Delete } from "@packages/ui/assets";
import { Button } from "@packages/ui/components/Button";
import { FeedbackBoxType } from "@packages/ui/components/PreviewResume/PreviewType";
import {
  feedbackAdd,
  feedbackChange,
  feedbackRemove,
} from "@/apis/feedback/feedback";
import { toast } from "react-toastify";

export const FeedbackBox = ({
  part,
  document_id,
  element_id,
  comment,
  children,
}: FeedbackBoxType) => {
  const [state, setState] = useState<string>(comment || "");
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [isFeedbackChange, setIsFeedbackChange] = useState<boolean>(!!comment);
  const openFeedBack = () => setDropdown(true);
  const closeFeedBack = () => setDropdown(false);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setState(e.target.value);
  };

  const deleteFeedback = () => {
    feedbackRemove({ document_id, element_id })
      .then(() => {
        closeFeedBack();
        setIsFeedbackChange(false);
        setState("");
      })
      .catch(() => {
        toast("피드백 삭제에 오류가 발생했습니다", {
          type: "error",
          autoClose: 500,
        });
      });
  };
  const changeFeedback = () => {
    if (!state) {
      toast("내용을 작성해 주세요", { type: "error", autoClose: 500 });
      return;
    }
    const props = { document_id, element_id, comment: state };
    (isFeedbackChange ? feedbackChange(props) : feedbackAdd(props))
      .then(() => {
        closeFeedBack();
        setIsFeedbackChange(true);
      })
      .catch(() =>
        toast("피드백 제출에 오류가 발생했습니다", {
          type: "error",
          autoClose: 1000,
        })
      );
  };

  return (
    <section className="flex gap-8 relative w-full">
      <div
        onClick={openFeedBack}
        className={`absolute left-[-48px] mt-[10px] rounded-[4px] w-4 h-4 shrink-0 ${
          isFeedbackChange ? "bg-blue" : "bg-gray200"
        }`}
      />
      <div className="w-full">
        {children}
        {dropdown && (
          <OutsideClickHandler onOutsideClick={closeFeedBack}>
            <div className="fixed bg-gray50 z-10 rounded-[10px] shadow-[0 80px 0 0] top-[calc(50%-200px)] left-[calc(50%-200px)] w-[400px] px-5 py-10 flex flex-col gap-5 shadow-[0_0_80px_0_rgba(0,0,0,0.04)] ">
              <div className="flex justify-between text-body3 text-blue [&_path]:fill-blue">
                {part}
                <Delete size={24} onClick={deleteFeedback} />
              </div>
              <textarea
                className="bg-gray100 w-full h-[200px] p-3 text-body7 resize-none rounded-[4px] focus:outline-0 focus:border-2 focus:border-gray300"
                placeholder="내용을 입력해 주세요"
                onChange={onChange}
                value={state}
              />
              <Button kind="point" onClick={changeFeedback}>
                피드백 추가
              </Button>
            </div>
          </OutsideClickHandler>
        )}
      </div>
    </section>
  );
};
