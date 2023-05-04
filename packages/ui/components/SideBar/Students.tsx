import React, { useState } from "react";
import { Arrow, LinkSvg } from "../../assets";
import { StudentListType } from ".";

interface PropsType {
  studentList: StudentListType[];
  id?: string;
}

export const Students = ({ studentList, id }: PropsType) => {
  return (
    <div className="flex flex-col gap-[10px]">
      <div className="text-body5">2022 1학년 8기</div>
      {studentList.map((classList, classNum) => (
        <StudentDropdown classList={classList} classNum={classNum} id={id} />
      ))}
    </div>
  );
};

interface StudentPropsType {
  classList: StudentListType;
  classNum: number;
  id?: string;
}

const StudentDropdown = ({ classList, classNum, id }: StudentPropsType) => {
  const [] = useState<boolean>(
    classList?.some((list) => list.student_id === id) || false
  );
  const isClass = classList?.some((list) => list.student_id === id);
  console.log(id, classList);
  return (
    <>
      <div className="flex text-body6 h-11 rounded-md bg-gray600 justify-between items-center px-3 [&_path]:fill-gray50">
        <div>{classNum + 1}반</div>
        <Arrow />
      </div>
      {classList?.map(({ name, student_number, student_id }) => {
        return (
          <div
            className={`flex text-[14px] ${
              id === student_id && "bg-gray100 text-gray700"
            } h-[33px] rounded-md px-3 justify-between items-center [&_path]:fill-gray50`}
          >
            {student_number} {name}
            <LinkSvg />
          </div>
        );
      })}
    </>
  );
};
