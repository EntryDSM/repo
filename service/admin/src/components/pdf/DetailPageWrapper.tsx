import { Dispatch, SetStateAction } from "react";
import { PreviewType } from "@packages/ui/components/PreviewResume/PreviewType";
import { studentIndex } from "../../pages/pdf";
import { DetailPage } from "./DetailPage";

interface indexType {
  data: PreviewType;
  setIndex: Dispatch<SetStateAction<{ [k: string]: studentIndex }>>;
  key: number;
}

const DetailPageWrapper = ({ data, setIndex, key }: indexType) => {
  return (
    <>
      <DetailPage data={data} setIndex={setIndex} key={key} />
    </>
  );
};

export default DetailPageWrapper;
