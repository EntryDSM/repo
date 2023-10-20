import React from "react";
import { PreviewType } from "./PreviewType";
import { millisecondToDate } from "../../utils/timeUtils";

export const Certificate = ({
  name,
  issuing_institution,
  date,
}: PreviewType["certificate_list"][0]) => {
  return (
    <>
      <div className="border-solid border-l-[4px] bg-gray50 px-4 py-1 border-gray500">
        <div className="flex justify-between">
          <h4 className="text-body5">{name}</h4>
          <div className="flex gap-2 items-center">
            <p className="text-gray400 text-body7">{issuing_institution}</p>
            <hr className="bg-gray300 h-[12px] border-none w-[1px]" />
            <p className="text-gray400 text-body7 font-medium min-w-[82px]">
              {millisecondToDate(date)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
