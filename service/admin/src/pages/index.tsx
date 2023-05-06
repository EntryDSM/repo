import Image from "next/image";
import { Inter } from "next/font/google";
import { Student } from "@/components/student";
import { Header } from "@/components/header";
import { Dropdown, Input } from "@packages/ui";
import { useQuery } from "react-query";
import { ChangeEvent, useState } from "react";
import { getStudent } from "@/apis/student";
import { getMajor } from "@/apis/major";

const studentNum = [
  { placeholder: "학년", lists: [1, 2, 3], name: "grade" },
  { placeholder: "반", lists: [1, 2, 3, 4], name: "classNum" },
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

  return (
    <>
      <Header />
      <div className="m-auto w-[1120px]">
        <p className="text-title1 mt-28">학생 관리</p>
        <p className="text-title4 mb-20">학생을 관리해보세요</p>
        <div className="mb-10 flex gap-5">
          <Input
            kind="text"
            value={option.name}
            placeholder="이름을 입려해 주세요"
            onChange={onHandleChange}
            name="name"
          />
          {studentNum.map(({ placeholder, lists, name }) => (
            <Dropdown
              className="w-40"
              placeholder={placeholder}
              lists={lists}
              name={name}
              value={option[name as "grade"]}
              onClick={({ keyword, name }) =>
                name && setOption({ ...option, [name]: keyword })
              }
            />
          ))}
          {major?.data && (
            <Dropdown
              className="w-40"
              placeholder="기술 스택"
              lists={major.data.major_list.map((e) => e.name)}
              name="major"
              value={option.major.name}
              onClick={({ keyword, name }) => {
                console.log(keyword);
                name &&
                  onOptionChange({
                    ...option,
                    [name as "grade"]: major.data.major_list.find(
                      (e) => e.name === keyword
                    ) as any,
                  });
              }}
            />
          )}
        </div>
        {data &&
          data.data.student_list.map((student) => <Student {...student} />)}
      </div>
    </>
  );
}
