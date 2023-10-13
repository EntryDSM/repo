import { StudentDetailType } from "@/apis/document/get/studentDetail";
import { RefObject } from "react";
import DetailPage from "./DetailPage";

const RenderAllDetail = ({
  detailArr,
  targetRef,
}: {
  detailArr: StudentDetailType[];
  targetRef: RefObject<HTMLDivElement>;
}) => {
  return (
    <div
      className={`w-[829px] flex flex-col items-center w-full justify-center bg-gray100`}
      ref={targetRef}
    >
      {detailArr.map((detail, index) => (
        <DetailPage {...detail} key={index} />
      ))}
    </div>
  );
};

export default RenderAllDetail;
