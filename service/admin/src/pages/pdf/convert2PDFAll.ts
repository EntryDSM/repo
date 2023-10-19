import { MutableRefObject } from "react";
import { studentIndex } from ".";

export const convert2PdfAll = async (
  { current }: MutableRefObject<HTMLElement | null>,
  fileName: string,
  index: { data: studentIndex[] },
  grade: number
) => {
  if (!current) return;

  console.log("converting...");
  const response = await fetch(`/api/pdf?grade=2`);
  const blob = await response.blob();

  // Create a URL for the blob
  const pdfUrl = URL.createObjectURL(blob);
  console.log(pdfUrl);

  // Open the PDF in a new tab for preview
  window.open(pdfUrl, "_blank");

  // promise()
  //   .then((blob) => {
  //     console.log("success");
  //     const file = new FormData();
  //     file.append("pdf", blob);
  //     file.append("index", JSON.stringify(index));
  //     saveDocument({ grade, file })
  //       .then(() => {
  //         console.log("document post successed");
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });
};
