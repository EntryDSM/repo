import { StudentDetailType } from "@/apis/document/get/studentDetail";
import DetailPage from "./DetailPage";

const RenderAllDetail = ({ detailArr }: { detailArr: StudentDetailType[] }) => {
  return (
    <div className={`w-[832px] flex flex-col bg-gray100`}>
      {detailArr.map((detail, index) => (
        <DetailPage {...detail} key={index} />
      ))}
    </div>
  );
};

export default RenderAllDetail;
