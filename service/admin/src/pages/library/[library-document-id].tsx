import { getLibrary } from "@/apis/library";
import { libraryIndexList } from "@/apis/library/list";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { PdfViewer } from "@packages/ui/";

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

  const libraryDocument = document?.data.library_document_list.find(
    ({ id }) => id === libraryId
  );
  const url = libraryDocument?.document_url
  const grade = libraryDocument?.grade

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
      grade={grade}
    />
  );
};
export default Library;
