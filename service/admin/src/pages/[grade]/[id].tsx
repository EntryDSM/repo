import { studentDetail } from "@/apis/document/get/studentDetail";
import { getStudent } from "@/apis/student";
import { PreviewResume, SideBar, TextArea } from "@packages/ui";
import Image from "next/image";
import { useRouter } from "next/router";
import { useQueries, useQuery } from "react-query";

const detail = () => {
  const { query } = useRouter();
  const { grade, id } = query;
  const { data } = useQuery(
    ["teacherPreview"],
    () => studentDetail(query.id as string),
    {
      enabled: !!query.id,
    }
  );
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

  return (
    <div>
      <SideBar studentList={result} id={id as string}>
        {data && <PreviewResume {...data.data} NextImage={Image} />}
      </SideBar>
    </div>
  );
};

export default detail;
