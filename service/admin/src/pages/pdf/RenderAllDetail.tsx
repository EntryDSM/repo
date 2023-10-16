import { StudentDetailType } from "@/apis/document/get/studentDetail";
import { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import DetailPage from "./DetailPage";
import { studentIndex } from ".";

const RenderAllDetail = ({
  detailArr,
  targetRef,
  setIsRender,
  setIndex,
}: {
  detailArr: StudentDetailType[];
  targetRef: RefObject<HTMLDivElement>;
  setIsRender: Dispatch<SetStateAction<boolean>>;
  setIndex: Dispatch<
    SetStateAction<{
      [k: string]: studentIndex;
    }>
  >;
}) => {
  useEffect(() => {
    setTimeout(() => {
      setIsRender(false);
    }, 2000);
  }, []);
  return (
    <div className={`w-[829px] flex flex-col bg-gray100`} ref={targetRef}>
      {detailArr.map((detail, index) => (
        <DetailPage data={detail} setIndex={setIndex} key={index} />
      ))}
    </div>
  );
};

export default RenderAllDetail;
