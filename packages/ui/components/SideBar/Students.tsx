import React from "react";
import { Arrow, LinkSvg } from "../../assets";

export const Students = () => {
  return (
    <div className="flex flex-col gap-[10px]">
      <div className="text-body5">2022 1학년 8기</div>
      <div className="flex text-body6 h-11 rounded-md bg-gray600 justify-between items-center px-3 [&_path]:fill-gray50">
        <div>1반</div>
        <Arrow />
      </div>
      {Array(10)
        .fill(0)
        .map(() => (
          <div className="flex text-[14px] h-[33px] rounded-md px-3 justify-between items-center [&_path]:fill-gray50">
            3207 김태완
            <LinkSvg />
          </div>
        ))}
    </div>
  );
};
