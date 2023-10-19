import { MutableRefObject } from "react";
import { studentIndex } from "../pages/pdf";
import { saveDocument } from "@/components/library/saveDocument";

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
};

//     console.timeEnd("make data");

//     canvas.map((canvas, index) => {
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;
//       let heightLeft = imgHeight;
//       let position = 0;
//       let asdf = 0;

//       while (heightLeft >= 0) {
//         asdf += 1;
//         doc.addImage(
//           imgData[index],
//           "PNG",
//           0,
//           position,
//           imgWidth,
//           imgHeight,
//           undefined,
//           "FAST"
//         );
//         heightLeft -= pageHeight;
//         position = heightLeft - imgHeight;
//         console.log("add page " + asdf);
//         if (heightLeft < 0 && index + 1 === imgData.length) return;
//         doc.addPage();
//       }
//     });
//     doc.save(fileName + ".pdf");
//     return doc.output("blob");
//   };
//   promise()
//     .then((blob) => {
//       console.log("success");
//       const file = new FormData();
//       file.append("pdf", blob);
//       file.append("index", JSON.stringify(index));
//       saveDocument({ grade, file })
//         .then(() => {
//           console.log("document post successed");
//         })
//         .catch((e) => {
//           console.log(e);
//         });
//     })
//     .catch((e) => {
//       console.log(e);
//     });
// };
