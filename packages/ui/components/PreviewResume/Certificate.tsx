import React from "react";

export const Certificate = () => {
  return (
    <>
      <div className="bg-gray50 rounded-md pl-5 pt-3 pb-3 pr-5">
        <div className="flex justify-between">
          <div className="text-body5">정보처리기능사</div>
          <div className="text-gray400 flex text-body7 gap-2 items-center">
            <div>전국SW마이스터고등학교</div>
            <hr className="bg-gray300 h-[12px] border-none w-[1px]" />
            <div>2022.06.15</div>
          </div>
        </div>
      </div>
    </>
  );
};
