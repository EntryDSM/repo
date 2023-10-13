import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { MutableRefObject } from "react";

export const convert2PdfAll = async (
  { current }: MutableRefObject<HTMLElement | null>,
  fileName: string
) => {
  if (!current) return;
  const promise = async () => {
    console.time("make data");
    const canvas = await html2canvas(current, {
      scale: 3,
      backgroundColor: "#f6f6f6",
    });
    const imgData = canvas.toDataURL("image/png");

    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    const doc = new jsPDF("p", "mm", "a4", true);
    let position = 0;

    console.timeEnd("make data");

    doc.addImage(
      imgData,
      "PNG",
      0,
      position,
      imgWidth,
      imgHeight,
      undefined,
      "FAST"
    );
    heightLeft -= pageHeight;

    let asdf = 0;
    while (heightLeft >= 0) {
      asdf += 1;
      position = heightLeft - imgHeight;
      doc.addPage();
      doc.addImage(
        imgData,
        "PNG",
        0,
        position,
        imgWidth,
        imgHeight,
        undefined,
        "FAST"
      );
      heightLeft -= pageHeight;
      console.log("add page " + asdf);
    }
    doc.save(fileName + ".pdf");
  };
  promise()
    .then(() => {
      console.log("success");
    })
    .catch((e) => {
      console.log(e);
    });
};
