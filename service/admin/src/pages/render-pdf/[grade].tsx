import {
  StudentDetailType,
  studentDetail,
} from "@/apis/document/get/studentDetail";
import { useRouter } from "next/router";
import { getStudent } from "@/apis/student";
import { useQueries } from "@tanstack/react-query";
import RenderAllDetailPdf from "../../components/pdf/RenderAllDetailPdf";
import { useEffect, useState } from "react";

export interface studentIndex {
  name: string;
  major: string;
  studentNumber: string;
  page: number;
}

const Grade = () => {
  const [detailArr, setDetailArr] = useState<StudentDetailType[]>([]);

  const { query } = useRouter();
  const grade = query["grade"];

  const studentListObject = (classNum: string) => ({
    queryKey: ["class" + classNum],
    queryFn: () => getStudent({ grade: grade as unknown as string, classNum }),
    enabled: !!grade,
    staleTime: Infinity,
  });
  const result = useQueries({
    queries: [
      studentListObject("1"),
      studentListObject("2"),
      studentListObject("3"),
      studentListObject("4"),
    ],
  })
    .map((list: any) =>
      list.data?.data.student_list.map((student: any) => student.student_id)
    )
    .flat();
  const allFinished = result.every((value: any) => value);

  const detailAll = async () => {
    if (allFinished) {
      let detailArr = [];
      for (let i = 0; i < result.length; i++) {
        // @ts-ignore
        const a = await studentDetail(result[i]);
        // @ts-ignore
        detailArr.push(a.data);
      }
      setDetailArr(detailArr);
    }
  };

  useEffect(() => {
    detailAll();
  }, [allFinished]);

  const [index, setIndex] = useState<{ [k: string]: studentIndex }>({});
  return <RenderAllDetailPdf detailArr={detailArr} setIndex={setIndex} />;
};
export default Grade;
