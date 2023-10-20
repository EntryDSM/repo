import { useRouter } from "next/router";
import { PdfViewer } from "@packages/ui";
import { useQuery } from "@tanstack/react-query";
import { libraryIndexList } from "@/apis/library/list";
import { getUrl } from "@/apis/library/getUrl";

const Library = () => {
  const { query } = useRouter();
  const libraryId = query["library-document-id"];
  const { data: student } = useQuery(
    ["studentListAdmin"],
    () => libraryIndexList(libraryId as string),
    { enabled: !!libraryId }
  );
  const { data: document } = useQuery(["documentListadmin"], () => getUrl(""), {
    enabled: !!libraryId,
  });

  const list = student?.data.index;
  const url = document?.data.library_document_list.find(
    ({ document_url }) => document_url === libraryId
  )?.document_url;

  return (
    <PdfViewer
      list={list?.map((value) => {
        return {
          name: value.name,
          student_number: value.student_number,
          major: {
            id: value.major,
            name: value.major,
          },
          page: value.page,
        };
      })}
      url={url}
    />
  );
};

export default Library;
