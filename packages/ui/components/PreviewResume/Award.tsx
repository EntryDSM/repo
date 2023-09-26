import React from "react";
import {millsecondToDate, PreviewType} from ".";

export const Award = ({
  element_id,
  name,
  awarding_institution,
  date,
  description,
}: PreviewType["award_list"][0]) => {
  return (
    <>
      <div className=" bg-gray50 rounded-md pl-5 pt-3 pb-3 pr-5 flex flex-col gap-[10px]">
        <div className="flex justify-between">
          <h4 className="text-body5">{name}</h4>
          <div className="flex gap-2 items-center">
            <p className="text-gray400 text-body7">{awarding_institution}</p>
            <hr className="bg-gray300 h-[12px] border-none w-[1px]" />
            <p className="text-gray400 text-body7 min-w-[82px]">{millsecondToDate(date)}</p>
          </div>
        </div>
        {description && <pre className="text-body7 whitespace-pre-wrap">{description}</pre>}
      </div>
    </>
  );
};
