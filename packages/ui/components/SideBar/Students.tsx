import React, { useState } from "react";
import { Arrow, Check, Internet, LinkSvg, Rectify } from "../../assets";
import { StudentListType } from ".";
import Link from "next/link";
import { useRouter } from "next/router";

interface PropsType {
  studentList: StudentListType[];
  moveClickedPage?: (page: number) => void;
  id?: string;
  grade?: string;
}

export const Students = ({
  studentList,
  id,
  moveClickedPage,
  grade,
}: PropsType) => {
  return (
    <div className="flex flex-col gap-[10px]">
      <div className="text-body5">{grade}학년</div>
      {studentList.map((classList, classNum) => (
        <StudentDropdown
          classList={classList}
          grade={grade}
          moveClickedPage={moveClickedPage}
          classNum={classNum}
          id={id}
        />
      ))}
    </div>
  );
};

interface StudentPropsType {
  classList: StudentListType;
  moveClickedPage?: (page: number) => void;
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
  moveClickedPage,
  id,
  grade,
}: StudentPropsType) => {
  const { push } = useRouter();
  const isClass = classList?.some((list) => list.student_id === id);
  const [open, setOpen] = useState<boolean>(isClass || false);
  const closeList = () => setOpen(!open);
  const arrowDirection = open ? "bottom" : "top";
  return (
    <>
      {!moveClickedPage && (
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
      )}
      {open &&
        classList?.map(
          ({ name, student_number, student_id, document_status }, idx) => {
            return (
              <div
                onClick={() =>
                  moveClickedPage
                    ? moveClickedPage(idx)
                    : push(`/${student_id}`)
                }
                className={`flex text-[14px] cursor-pointer ${
                  id === student_id && "bg-gray100 text-gray700"
                } py-2 rounded-md px-3 justify-between items-center [&_path]:fill-gray400`}
              >
                {student_number} {name}
                {document_status && StudentIcon[document_status]}
              </div>
            );
          }
        )}
    </>
  );
};
