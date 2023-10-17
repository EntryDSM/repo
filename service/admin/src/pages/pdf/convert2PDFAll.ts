import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { MutableRefObject } from "react";
import { studentIndex } from ".";
import { saveDocument } from "@/components/library/saveDocument";

export const convert2PdfAll = async (
  { current }: MutableRefObject<HTMLElement | null>,
  fileName: string,
  index: { data: studentIndex[] },
  grade: number
) => {
  if (!current) return;
  const promise = async () => {
    console.time("make data");
    const maxPage = 18;
    const loopNum = Math.ceil(current.scrollHeight / (1164 * maxPage));
    const canvas = [];

    let offset = 0;
    for (let i = 0; i < loopNum; i++) {
      canvas.push(
        await html2canvas(current, {
          height:
            i === loopNum - 1
              ? current.scrollHeight - (loopNum - 1) * maxPage * 1164
              : 1164 * maxPage,
          y: offset,
          scale: 1.5,
          backgroundColor: "#f6f6f6",
        })
      );
      offset += 1164 * maxPage;
      console.log(offset);
    }

    console.log(canvas);

    const imgData = canvas.map((value) => value.toDataURL("image/png"));

    const imgWidth = 210;
    const pageHeight = 295;

    const doc = new jsPDF("p", "mm", "a4", true);

    console.timeEnd("make data");

    canvas.map((canvas, index) => {
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      let asdf = 0;

      while (heightLeft >= 0) {
        asdf += 1;
        doc.addImage(
          imgData[index],
          "PNG",
          0,
          position,
          imgWidth,
          imgHeight,
          undefined,
          "FAST"
        );
        heightLeft -= pageHeight;
        position = heightLeft - imgHeight;
        console.log("add page " + asdf);
        if (heightLeft < 0 && index + 1 === imgData.length) return;
        doc.addPage();
      }
    });
    doc.save(fileName + ".pdf");
    return doc.output("blob");
  };
  promise()
    .then((blob) => {
      console.log("success");
      const file = new FormData();
      file.append("pdf", blob);
      file.append("index", JSON.stringify(index));
      saveDocument({ grade, file })
        .then(() => {
          console.log("document post successed");
        })
        .catch((e) => {
          console.log(e);
        });
    })
    .catch((e) => {
      console.log(e);
    });
};
