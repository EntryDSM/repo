import Image from "next/image";
import { Inter } from "next/font/google";
import { Student } from "@/components/student";
import { Header } from "@/components/header";
import { Dropdown, Input, dropdownAll } from "@packages/ui";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { getStudent } from "@/apis/student";
import { getMajor } from "@/apis/major";

const studentNum = [
  { placeholder: "학년", lists: ["전체", "1", "2", "3"], name: "grade" },
  { placeholder: "반", lists: ["전체", "1", "2", "3", "4"], name: "classNum" },
];

export default function Home() {
  const { data: major } = useQuery(["asfaf"], getMajor);

  const [option, setOption] = useState({
    name: "",
    grade: "",
    classNum: "",
    major: {
      id: "",
      name: "",
    },
  });
  const { data } = useQuery(["dwqdq", option], () =>
    getStudent({ ...option, major: option.major.id })
  );

  const onOptionChange = (state: typeof option) => {
    setOption(state);
  };

  const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    onOptionChange({ ...option, [name]: value });
  };

  const studentList = data?.data.student_list;
  return (
    <>
      <Header />
      <div className="m-auto max-w-[1200px] px-[40px] sm:px-[20px] mt-40">
        <p className="text-title1 mt-[120px] mb-[10px]">학생 관리</p>
        <p className="text-title4 sm:text-[20px] mb-20">학생을 관리해보세요</p>
        <div className="mb-10 flex gap-5 sm:flex-wrap md:flex-wrap">
          <Input
            kind="text"
            value={option.name}
            placeholder="이름을 입력해 주세요"
            onChange={onHandleChange}
            name="name"
            className="bg-transparent rounded-sm sm:w-full"
          />
          <div className="sm:w-full flex gap-3">
            {studentNum.map(({ placeholder, lists, name }) => (
              <Dropdown
                className="w-40 sm:w-[114px]"
                key={placeholder}
                placeholder={placeholder}
                lists={lists}
                name={name}
                value={option[name as "grade"]}
                onClick={({ keyword, name }) =>
                  name && setOption({ ...option, [name]: dropdownAll(keyword) })
                }
              />
            ))}
          </div>
          {major?.data && (
            <Dropdown
              className="w-40 sm:w-[240px]"
              placeholder="기술 스택"
              lists={[{ name: "전체", id: "" }, ...major.data.major_list]}
              name="major"
              objectKey="name"
              value={option.major}
              onClick={({ keyword, name }) => {
                keyword.name = dropdownAll(keyword.name);
                name &&
                  onOptionChange({
                    ...option,
                    [name]: keyword,
                  });
              }}
            />
          )}
        </div>
        <div className="flex flex-col items-center gap-5 sm:gap-3 mb-20">
          {!!studentList?.length ? (
            studentList.map((student) => (
              <Student key={student.document_id} {...student} />
            ))
          ) : (
            <div className=" text-body3 mt-10">
              조건에 맞는 학생이 없습니다. 다른 조건을 선택해 주세요
            </div>
          )}
        </div>
      </div>
    </>
  );
}
