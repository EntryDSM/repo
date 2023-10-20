import React from "react";
import { PreviewType } from "./PreviewType";
import { millisecondToDate } from "../../utils/timeUtils";

export const Award = ({
  element_id,
  name,
  awarding_institution,
  date,
  description,
}: PreviewType["award_list"][0]) => {
  return (
    <>
      <div className="border-solid border-l-[4px] bg-gray50 px-4 py-1 border-gray500 flex flex-col gap-[10px]">
        <div className="flex justify-between">
          <h4 className="text-body5">{name}</h4>
          <div className="flex gap-2 items-center">
            <p className="text-gray400 text-body7">{awarding_institution}</p>
            <hr className="bg-gray300 h-[12px] border-none w-[1px]" />
            <p className="text-gray400 text-body7 min-w-[82px]">
              {millisecondToDate(date)}
            </p>
          </div>
        </div>
        {description && (
          <pre className="text-body7 font-medium whitespace-pre-wrap">{description}</pre>
        )}
      </div>
    </>
  );
};
