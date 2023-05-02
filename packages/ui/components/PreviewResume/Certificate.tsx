import React from "react";
import { PreviewType, millsecondToDate } from ".";

export const Certificate = ({
  element_id,
  name,
  issuing_institution,
  date,
}: PreviewType["certificate_list"][0]) => {
  return (
    <>
      <div className="bg-gray50 rounded-md pl-5 pt-3 pb-3 pr-5">
        <div className="flex justify-between">
          <div className="text-body5">{name}</div>
          <div className="text-gray400 flex text-body7 gap-2 items-center">
            <div>{issuing_institution}</div>
            <hr className="bg-gray300 h-[12px] border-none w-[1px]" />
            <div>{millsecondToDate(date)}</div>
          </div>
        </div>
      </div>
    </>
  );
};
