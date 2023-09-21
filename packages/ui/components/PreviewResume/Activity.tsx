import React from "react";
import { PreviewType } from ".";
import { millisecondToDate } from "../../utils/timeUtils";

export const Activity = ({
  element_id,
  name,
  date,
  end_date,
  is_period,
  description,
}: PreviewType["activity_list"][0]) => {
  return (
    <>
      <div className="bg-gray50 rounded-md pl-5 pt-3 pb-3 pr-5 flex flex-col gap-[10px]">
        <div className="flex justify-between">
          <h4 className="text-body5">{name}</h4>
          <div className="flex gap-2 items-center">
            <p className="text-gray400 text-body7">
              {millisecondToDate(date)}
              {is_period && " ~ " + millisecondToDate(end_date)}
            </p>
          </div>
        </div>
        {description && (
          <pre className="text-body7 whitespace-pre-wrap">{description}</pre>
        )}
      </div>
    </>
  );
};
