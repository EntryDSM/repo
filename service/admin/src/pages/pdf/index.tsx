import {
  StudentDetailType,
  studentDetail,
} from "@/apis/document/get/studentDetail";
import { getStudent } from "@/apis/student";
import { Header } from "@/components/header";
import { useQueries } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@packages/ui";
import { Check } from "@packages/ui/assets";
import RenderAllDetail from "./RenderAllDetail";

const pdf = () => {
  const [grade, setGrade] = useState<number>(2);
  const [detailArr, setDetailArr] = useState<StudentDetailType[]>([]);
  const [progress, setProgress] = useState<number>(0);

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
    .map((list) =>
      list.data?.data.student_list.map((student) => student.student_id)
    )
    .flat();

  const allFinished = result.every((value) => value);

  const detailAll = async () => {
    setProgress(0);
    if (allFinished) {
      let detailArr = [];
      for (let i = 0; i < result.length; i++) {
        setProgress((v) => v + 1);
        // @ts-ignore
        const a = await studentDetail(result[i]);
        detailArr.push(a.data);
      }
      console.log(detailArr);
      setDetailArr(detailArr);
    }
  };

  const isDone = () => {
    if (progress === result.length) {
      return "bg-green";
    }
  };

  return (
    <div>
      <Header />
      <div className="m-auto max-w-[1200px] px-[40px] sm:px-[20px] mt-40 pb-20">
        <p className="text-title1 mt-28 mb-[10px]">PDF</p>
        <p className="text-title4 sm:text-[20px] mb-20">
          학년별로 PDF를 저장해보세요
        </p>
        <div className="flex w-full justify-between">
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <button
                key={i}
                className={`transition-all py-3 px-5 text-body5 rounded-[8px] hover:bg-gray800 hover:text-gray50 ${
                  grade === i ? "bg-gray800 text-gray50" : "bg-gray50"
                }`}
                onClick={() => setGrade(i)}
              >
                {i}학년
              </button>
            ))}
          </div>
          <Button kind="outline" onClick={detailAll} disabled={progress !== 0}>
            {grade}학년 PDF 저장하기
          </Button>
        </div>
        <div className="w-full p-10 bg-gray50 rounded-[16px] my-10">
          <div className="w-full flex items-center">
            <div className="w-60 text-body5 flex gap-2 items-center">
              학생 정보 불러오기 {isDone() && <Check color="#04DF00" />}
            </div>
            <div className="w-full h-4 bg-gray200 rounded-[10px]">
              <div
                className={`transition-all h-full rounded-[10px] ${isDone()} bg-gray900`}
                style={{ width: `${(progress / result.length) * 100}%` }}
              />
            </div>
            <p className="w-16 text-right">
              {Math.floor((progress / result.length) * 100)}%
            </p>
          </div>
        </div>
        <RenderAllDetail detailArr={detailArr} />
      </div>
    </div>
  );
};

export default pdf;
