import { Tag } from "@packages/ui/components/PreviewResume/Tag";
import { Award } from "@packages/ui/components/PreviewResume/Award";
import { Certificate } from "@packages/ui/components/PreviewResume/Certificate";
import { Project } from "@packages/ui/components/PreviewResume/Project";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Activity } from "@packages/ui/components/PreviewResume/Activity";
import QRCode from "qrcode.react";
import { PreviewType } from "@packages/ui/components/PreviewResume/PreviewType";
import { studentIndex } from ".";
import { DetailPage } from "../render-pdf/DetailPage"

const subject = {
  1: "소프트웨어개발과",
  2: "소프트웨어개발과",
  3: "임베디드소프트웨어과",
  4: "정보보안과",
};

interface indexType {
  data: PreviewType;
  setIndex: Dispatch<SetStateAction<{ [k: string]: studentIndex }>>;
  key: number;
}

const DetailPageWrapper = ({ data, setIndex, key }: indexType) => {
  return (
    <>
      <DetailPage data={data} setIndex={setIndex} key={key}/>
    </>
  );
};

export default DetailPage;
