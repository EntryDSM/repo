import { StudentDetailType } from "@/apis/document/get/studentDetail";
import { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import DetailPage from "./DetailPage";
import { studentIndex } from "../pdf";

interface renderDetailType {
  detailArr: StudentDetailType[];
  setIndex: Dispatch<SetStateAction<{ [k: string]: studentIndex }>>;
}

const RenderAllDetail = ({ detailArr, setIndex }: renderDetailType) => {
  return (
    <div className={`w-[832px] flex flex-col bg-gray100`}>
      {detailArr.map((detail, index) => (
        <DetailPage data={detail} setIndex={setIndex} key={index} />
      ))}
    </div>
  );
};

export default RenderAllDetail;
