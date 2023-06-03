import React, { useState } from "react";
import { SideBar, StudentListType } from "./SideBar";
import { Document, Page, pdfjs } from "react-pdf";

interface PropsType {
  list: StudentListType;
  url?: string;
}

export const PdfViewer = ({ url, list }: PropsType) => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [page, setPage] = useState<number>(0);
  const onPDFOpen = ({ numPages }: { numPages: number }) => {
    setPage(numPages);
    console.log(numPages);
  };
  const moveClickedPage = (page: number) => {
    if (!list) return;
    const usersPageTop = list[page].page;
    if (usersPageTop !== undefined)
      document.documentElement.scrollTo({
        top: 1002 * usersPageTop,
        behavior: "smooth",
      });
  };
  return url ? (
    <SideBar studentList={[list]} moveClickedPage={moveClickedPage}>
      <Document file={url} onLoadSuccess={onPDFOpen}>
        {Array(page)
          .fill(0)
          .map((_, idx) => (
            <Page
              pageIndex={idx}
              key={idx}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          ))}
      </Document>
    </SideBar>
  ) : (
    <SideBar>접근 권한이 있는 지, 문서가 있는 지 확인해 보세요.</SideBar>
  );
};
