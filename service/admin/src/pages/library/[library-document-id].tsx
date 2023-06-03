import { useRouter } from "next/router";
import { PdfViewer, SideBar } from "../../../../../packages/ui";
import { useQuery } from "@tanstack/react-query";
import { libraryIndexList } from "@/apis/library/list";
import { getLibrary } from "@/apis/library";

const Library = () => {
  const { query } = useRouter();
  const libraryId = query["library-document-id"];
  const { data: student } = useQuery(
    ["studentListAdmin"],
    () => libraryIndexList(libraryId as string),
    { enabled: !!libraryId }
  );
  const { data: document } = useQuery(
    ["documentListadmin"],
    () => getLibrary(""),
    {
      enabled: !!libraryId,
    }
  );

  const list = student?.data.index;
  const url = document?.data.library_document_list.find(
    ({ id }) => id === libraryId
  )?.document_url;

  return <PdfViewer list={list} url={url} />;
};

export default Library;
