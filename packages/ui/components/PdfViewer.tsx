 import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { SideBar, StudentListType } from "./SideBar";
import "./pdfDocument.css";

interface PropsType {
  list: StudentListType;
  url?: string;
}

export const PdfViewer = ({ url, list }: PropsType) => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [page, setPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const onPDFOpen = ({ numPages }: { numPages: number }) => {
    setPage(numPages - 1);
  };
  const moveClickedPage = (page: number) => {
    if (!list) return;
    setCurrentPage(page)
  };

  const getNameByList = (list: StudentListType) => {
    return list?.filter((l) => l.page <= currentPage).pop()?.name
  }

  const getPageByList = (list: StudentListType) => {
    const findIndex = list?.findIndex((l) => l.name === getNameByList(list))

    return {
      prev: list[findIndex - 1]?.page,
      current: list[findIndex].page,
      next: list[findIndex + 1]?.page
    }
  }

  getNameByList(list)

  return url ? (
    <SideBar studentList={[list]} moveClickedPage={moveClickedPage} currentPage={String(currentPage)}>
      <Document className={"document"} file={url} onLoadSuccess={onPDFOpen}>
        <Page
            pageIndex={currentPage}
            key={Date()}
            renderAnnotationLayer={false}
            renderTextLayer={false}
        ></Page>
        <Page
            pageIndex={currentPage + 1}
            key={Date() + 1}
            renderAnnotationLayer={false}
            renderTextLayer={false}
        ></Page>
      </Document>
      <div className="fixed flex right-32 bottom-14 gap-2">
        <div className="flex bg-gray900 rounded-3xl h-8 w-32 justify-center gap-2 text-gray50">
          <button onClick={() => setCurrentPage(prev => (prev - 2) > 0 ? prev - 2 : 0)}>&larr;</button>
          <p className="flex items-center">{currentPage + 1} / {page}</p>
          <button onClick={() => setCurrentPage(prev => (prev + 2) < page ? prev + 2 : page - 1)}>&rarr;</button>
        </div>
        <div className="flex bg-gray900 rounded-3xl h-8 w-32 justify-center gap-2 text-gray50">
          <button onClick={() => setCurrentPage(getPageByList(list)?.prev ?? 0)}>&larr;</button>
          <p className="flex items-center">{getNameByList(list)}</p>
          <button onClick={() => setCurrentPage(getPageByList(list)?.next ?? page - 1)}>&rarr;</button>
        </div>
      </div>
    </SideBar>
  ) : (
    <SideBar>접근 권한이 있는 지, 문서가 있는 지 확인해 보세요.</SideBar>
  );
};
