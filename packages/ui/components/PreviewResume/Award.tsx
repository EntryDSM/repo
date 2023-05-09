import React from "react";
import { PreviewType, millsecondToDate } from ".";

export const Award = ({
  element_id,
  name,
  awarding_institution,
  date,
  description,
}: PreviewType["award_list"][0]) => {
  return (
    <>
      <div className="bg-gray50 rounded-md pl-5 pt-3 pb-3 pr-5 flex flex-col gap-3">
        <div className="flex justify-between">
          <div className="text-body5">{name}</div>
          <div className="text-gray400 flex text-body7 gap-2 items-center">
            <div>{awarding_institution}</div>
            <hr className="bg-gray300 h-[12px] border-none w-[1px]" />
            <div>{millsecondToDate(date)}</div>
          </div>
        </div>
        {description && <div className="text-body7">{description}</div>}
      </div>
    </>
  );
};
