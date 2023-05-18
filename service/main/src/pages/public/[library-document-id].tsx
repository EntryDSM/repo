import { useRouter } from "next/router";
import { SideBar } from "../../../../../packages/ui";
import { useQuery } from "@tanstack/react-query";
import { detailLibrary } from "@/apis/library/detail";
import { useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { listLibrary } from "@/apis/library/list";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const link =
  "https://s3.ap-northeast-2.amazonaws.com/file.dsm-repo.com/images/document/2022_2_2023-05-11.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230512T095446Z&X-Amz-SignedHeaders=host&X-Amz-Expires=14400&X-Amz-Credential=AKIARAQBFQOJWJUGVH4H%2F20230512%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=c2d8d5823ad7591852e963632858fdd8dc95c767384120f4ba6e5bb5ce2480ec";

const initStudent = {
  name: "",
  student_numbe: "",
};

const Library = () => {
  const [page, setPage] = useState<number>(0);
  const { query } = useRouter();
  const id = query["library-document-id"];

  const { data: detail } = useQuery(
    ["detailLibrary"],
    () => detailLibrary(id as string),
    {
      enabled: !!id,
    }
  );
  const onPDFOpen = ({ numPages }: { numPages: number }) => {
    setPage(numPages);
    console.log(numPages);
  };

  const data = detail?.data;

  const moveClickedPage = (page: number) => {
    const usersPageTop = data?.index[page].page;
    console.log(usersPageTop);
    if (usersPageTop !== undefined)
      document.documentElement.scrollTo({
        top: 1648 * usersPageTop,
        behavior: "smooth",
      });
  };

  return (
    data && (
      <SideBar studentList={[data.index]} moveClickedPage={moveClickedPage}>
        <Document file={data.document_url} onLoadSuccess={onPDFOpen}>
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
    )
  );
};

export default Library;
