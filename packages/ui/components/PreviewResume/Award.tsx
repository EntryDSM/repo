import React from "react";

export const Award = () => {
  return (
    <>
      <div className="bg-gray50 rounded-md pl-5 pt-3 pb-3 pr-5">
        <div className="flex justify-between">
          <div className="text-body5">연합해커톤 대통령상</div>
          <div className="text-gray400 flex text-body7 gap-2 items-center">
            <div>전국SW마이스터고등학교</div>
            <hr className="bg-gray300 h-[12px] border-none w-[1px]" />
            <div>2022.06.15</div>
          </div>
        </div>
        <div className="text-body7">
          소프트웨어마이스터고 재학생을 대상으로 한 연합해커톤에서 대통령상을
          수상했습니다.
        </div>
      </div>
    </>
  );
};
