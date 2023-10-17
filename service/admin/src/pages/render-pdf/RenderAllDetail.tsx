import { StudentDetailType } from "@/apis/document/get/studentDetail";
import { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import DetailPage from "./DetailPage";
import { studentIndex } from ".";

const RenderAllDetail = ({
  detailArr,
  targetRef,
  setIndex,
}: {
  detailArr: StudentDetailType[];
  targetRef: RefObject<HTMLDivElement>;
  setIndex: Dispatch<
    SetStateAction<{
      [k: string]: studentIndex;
    }>
  >;
}) => {
  return (
    <div className={`w-[832px] flex flex-col bg-gray100`} ref={targetRef}>
      {detailArr.map((detail, index) => (
        <DetailPage data={detail} setIndex={setIndex} key={index} />
      ))}
    </div>
  );
};

export default RenderAllDetail;
