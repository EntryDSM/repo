import html2Canvas from "html2canvas";
import { MutableRefObject } from "react";

export const usePdf = async (ref: MutableRefObject<HTMLDivElement | null>) => {
  const node = ref.current;
  if (!node) return;
  for (const ele of node.childNodes) {
    // console.log(ele);
  }
};
