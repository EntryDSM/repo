import { studentDetail } from "@/apis/document/get/studentDetail";
import { documentShare, documentUnShare } from "@/apis/document/post/shard";
import { getStudent } from "@/apis/student";
import { FeedbackBox } from "@/components/FeedbackBox";
import { Sharing } from "@/components/Sharing";
import { Button, PreviewResume, SideBar, TextArea } from "@packages/ui";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useQueries, useQuery } from "react-query";

const detail = () => {
  const { query } = useRouter();
  const { id } = query;
  const pdfRef = useRef<HTMLDivElement | null>(null);

  const { data } = useQuery(
    ["teacherPreview", id],
    () => studentDetail(query.id as string),
    {
      enabled: !!query.id,
    }
  );
  const grade = data?.data.writer.student_number.toString()[0];

  const studentListObject = (classNum: string) => ({
    queryKey: ["class" + classNum],
    queryFn: () => getStudent({ grade: grade as string, classNum }),
    enabled: !!grade,
  });
  const result = useQueries([
    studentListObject("1"),
    studentListObject("2"),
    studentListObject("3"),
    studentListObject("4"),
  ]).map((list) => list.data?.data.student_list);

  const Shared = () => {
    if (!data) return <></>;
    const { writer, document_status, document_id } = data.data;
    const { student_number, name } = writer;
    return (
      <Sharing
        status={document_status}
        name={student_number + name}
        document_id={document_id}
        targetRef={pdfRef}
      />
    );
  };
  return (
    <div>
      <SideBar
        studentList={result}
        id={id as string}
        grade={grade}
        status={data?.data.document_status}
        Sharing={Shared}
      >
        <div ref={pdfRef}>
          {data && <PreviewResume {...data.data} FeedbackBox={FeedbackBox} />}
        </div>
      </SideBar>
    </div>
  );
};

export default detail;
