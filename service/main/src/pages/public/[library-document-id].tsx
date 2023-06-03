import { useRouter } from "next/router";
import { PdfViewer, SideBar } from "../../../../../packages/ui";
import { useQuery } from "@tanstack/react-query";
import { detailLibrary } from "@/apis/library/detail";

const Library = () => {
  const { query } = useRouter();
  const id = query["library-document-id"];

  const { data: detail } = useQuery(
    ["detailLibrary"],
    () => detailLibrary(id as string),
    {
      enabled: !!id,
      staleTime: Infinity,
    }
  );

  const data = detail?.data;

  return <PdfViewer list={data?.index} url={data?.document_url} />;
};

export default Library;
