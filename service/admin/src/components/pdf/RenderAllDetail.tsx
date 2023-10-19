import { StudentDetailType } from "@/apis/document/get/studentDetail";
import { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import DetailPageWrapper from "./DetailPageWrapper";
import { studentIndex } from "../../pages/pdf";

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
    }, 4000);
  }, []);
  return (
    <div className={`w-[829px] flex flex-col bg-gray100`} ref={targetRef}>
      {detailArr.map((detail, index) => (
        <DetailPageWrapper data={detail} setIndex={setIndex} key={index} />
      ))}
    </div>
  );
};

export default RenderAllDetail;
