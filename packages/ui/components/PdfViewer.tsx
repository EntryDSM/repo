import React, { ChangeEvent, useState, useEffect, SyntheticEvent } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { SideBar, StudentListType } from "./SideBar";
import "./pdfDocument.css";
import { Arrow } from "../assets";

interface PropsType {
  list: StudentListType;
  url?: string;
}

export const PdfViewer = ({ url, list }: PropsType) => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [page, setPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [innerHeight, setInnerHeight] = useState<number>(1080);

  useEffect(() => {
    setInnerHeight(window.innerHeight + 50);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setCurrentPage(currentPage + 2 < page ? currentPage + 2 : page - 1);
      } else if (e.key === "ArrowLeft") {
        setCurrentPage(currentPage - 2 > 0 ? currentPage - 2 : 0);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", () =>
      setInnerHeight(window.innerHeight + 50)
    );
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage]);

  interface EditablePagePropsType {
    page: number;
    min: number;
    max: number;
  }
  const EditablePage = ({ page, min, max }: EditablePagePropsType) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputPage, setInputPage] = useState(0);

    const handleBlurOrEnterKey = (e: SyntheticEvent) => {
      if (
        e.type === "blur" ||
        (e.type === "keypress" && (e as React.KeyboardEvent).key === "Enter")
      ) {
        setIsEditing(false);
        const page = Number(inputPage) - 1;
        setCurrentPage(page - (page % 2));
      }
    };

    return (
      <div>
        {isEditing ? (
          <input
            type="number"
            className="w-[50px]"
            style={{ backgroundColor: "white", color: "black" }}
            value={inputPage}
            min={min}
            max={max}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInputPage(Number(e.target.value))
            }
            onKeyPress={handleBlurOrEnterKey}
            onBlur={handleBlurOrEnterKey}
            autoFocus
          />
        ) : (
          <div
            onClick={() => {
              setInputPage(currentPage + 1);
              setIsEditing(true);
            }}
            className="bg-black text-white"
          >
            {currentPage + 1}
            {currentPage + 1 != page ? " - " + (currentPage + 2) : ""}
          </div>
        )}
      </div>
    );
  };

  const onPDFOpen = ({ numPages }: { numPages: number }) => {
    setPage(numPages - 1);
  };
  const moveClickedPage = (page: number) => {
    if (!list) return;
    setCurrentPage(page);
  };

  const getNameByList = (list: StudentListType) => {
    return list?.filter((l) => (l.page as number) <= currentPage + 1).pop()
      ?.name;
  };

  const getPageByList = (list: StudentListType) => {
    const findIndex =
      list?.findIndex((l) => l.name === getNameByList(list)) ?? 0;

    return {
      prev: list![findIndex - 1]?.page,
      current: list![findIndex].page,
      next: list![findIndex + 1]?.page,
    };
  };

  return url ? (
    <SideBar
      studentList={[list]}
      moveClickedPage={moveClickedPage}
      currentPage={String(currentPage)}
    >
      <Document
        className={"document mt-[-25px]"}
        file={url}
        onLoadSuccess={onPDFOpen}
      >
        <Page
          pageIndex={currentPage}
          key={Date()}
          renderAnnotationLayer={false}
          renderTextLayer={false}
          canvasBackground={"#F6F6F6"}
          height={innerHeight}
        ></Page>
        <Page
          pageIndex={currentPage + 1}
          key={Date() + 1}
          renderAnnotationLayer={false}
          renderTextLayer={false}
          canvasBackground={"#F6F6F6"}
          height={innerHeight}
        ></Page>
      </Document>
      <div className="fixed flex flex-row pr-[20px] right-32 bottom-14 gap-[20px] h-[32px]">
        <div className="flex bottom-14 gap-2">
          <div className="flex flex-row bg-gray900 rounded-3xl py-[4px] px-[12px] justify-center gap-[6px] text-gray50 items-center">
            <button
              onClick={() =>
                setCurrentPage((prev) => (prev - 2 > 0 ? prev - 2 : 0))
              }
            >
              <Arrow
                direction="left"
                className={`[&_path]:${
                  !currentPage ? "fill-gray400" : "fill-gray50"
                }`}
              />
            </button>
            <div className="flex flex-row gap-[3px]">
              <EditablePage page={page} min={1} max={page} />{" "}
              <div> / {page}</div>
            </div>
            <button
              onClick={() =>
                setCurrentPage((prev) => (prev + 2 < page ? prev + 2 : page))
              }
            >
              <Arrow
                className={`[&_path]:${
                  currentPage === page - 2 || currentPage === page - 1
                    ? "fill-gray400"
                    : "fill-gray50"
                }`}
              />
            </button>
          </div>
        </div>
        <div className="flex bottom-14 gap-2">
          <div className="flex bg-gray900 rounded-3xl py-[4px] px-[12px] justify-center gap-[6px] text-gray50 items-center w-[150px]">
            <button
              onClick={() => {
                // 페이지를 홀수로 맞추기 위한 연산
                const page = getPageByList(list)?.prev ?? 0;
                setCurrentPage(page - (page % 2));
              }}
            >
              <Arrow
                direction="left"
                className={`[&_path]:${
                  !currentPage ? "fill-gray400" : "fill-gray50"
                }`}
              />
            </button>
            <p className="flex items-center">{getNameByList(list)}</p>
            <button
              onClick={() => {
                const page = getPageByList(list)?.next ?? 0;
                setCurrentPage(page - (page % 2));
              }}
            >
              <Arrow
                className={`[&_path]:${
                  currentPage === page - 2 || currentPage === page - 1
                    ? "fill-gray400"
                    : "fill-gray50"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </SideBar>
  ) : (
    <SideBar>
      <p className="mt-[50px]">존재하지 않거나 접근 권한이 없는 문서입니다.</p>
    </SideBar>
  );
};
