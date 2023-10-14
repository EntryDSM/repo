import { StudentDetailType } from "@/apis/document/get/studentDetail";
import { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import DetailPage from "./DetailPage";

const RenderAllDetail = ({
  detailArr,
  targetRef,
  setIsRender,
}: {
  detailArr: StudentDetailType[];
  targetRef: RefObject<HTMLDivElement>;
  setIsRender: Dispatch<SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    setTimeout(() => {
      setIsRender(false);
    }, 1000);
  }, []);
  return (
    <div
      className={`w-[829px] flex flex-col bg-gray100`}
      ref={targetRef}
    >
      {detailArr.map((detail, index) => (
        <DetailPage {...detail} key={index} />
      ))}
    </div>
  );
};

export default RenderAllDetail;
