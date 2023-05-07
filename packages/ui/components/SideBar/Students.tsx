import React, { useState } from "react";
import { Arrow, Check, Internet, LinkSvg, Rectify } from "../../assets";
import { StudentListType } from ".";
import Link from "next/link";

interface PropsType {
  studentList: StudentListType[];
  id?: string;
  grade?: string;
}

export const Students = ({ studentList, id, grade }: PropsType) => {
  return (
    <div className="flex flex-col gap-[10px]">
      <div className="text-body5">2022 1학년 8기</div>
      {studentList.map((classList, classNum) => (
        <StudentDropdown
          classList={classList}
          grade={grade}
          classNum={classNum}
          id={id}
        />
      ))}
    </div>
  );
};

interface StudentPropsType {
  classList: StudentListType;
  classNum: number;
  id?: string;
  grade?: string;
}

const StudentIcon = {
  CREATED: <Rectify size={16} />,
  SUBMITTED: <Check size={16} />,
  SHARED: <Internet />,
};

const StudentDropdown = ({
  classList,
  classNum,
  id,
  grade,
}: StudentPropsType) => {
  const isClass = classList?.some((list) => list.student_id === id);
  const [open, setOpen] = useState<boolean>(isClass || false);
  const closeList = () => setOpen(!open);
  const arrowDirection = open ? "bottom" : "top";
  return (
    <>
      <div
        onClick={closeList}
        className={`flex text-body6 h-11 rounded-md ${
          isClass
            ? "bg-gray100 [&_path]:fill-gray900 text-gray900"
            : "bg-gray600"
        } justify-between items-center px-3 [&_path]:fill-gray50`}
      >
        <div>{classNum + 1}반</div>
        <Arrow direction={arrowDirection} size={16} />
      </div>
      {open &&
        classList?.map(
          ({ name, student_number, student_id, document_status }) => {
            return (
              <Link href={`/${grade}/${student_id}`}>
                <div
                  className={`flex text-[14px] ${
                    id === student_id && "bg-gray100 text-gray700"
                  } py-2 rounded-md px-3 justify-between items-center [&_path]:fill-gray400`}
                >
                  {student_number} {name}
                  {StudentIcon[document_status]}
                </div>
              </Link>
            );
          }
        )}
    </>
  );
};
