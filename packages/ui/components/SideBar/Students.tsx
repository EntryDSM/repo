import { useRouter } from "next/router";
import React, { useState } from "react";
import { StudentListType } from ".";
import { Arrow, CheckCircle, Internet, Rectify } from "../../assets";

interface PropsType {
  studentList: StudentListType[];
  moveClickedPage?: (page: number) => void;
  id?: string;
  grade?: string;
  currentPage?: string;
}

export const Students = ({
  studentList,
  id,
  moveClickedPage,
  grade,
  currentPage,
}: PropsType) => {
  return (
    <div className="flex flex-col gap-[10px]">
      <p className="text-body5">{grade}학년</p>
      {studentList.map((classList, classNum) => (
        <StudentDropdown
          classList={classList}
          grade={grade}
          moveClickedPage={moveClickedPage}
          classNum={classNum}
          id={id}
          currentPage={currentPage}
          key={classNum}
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
  currentPage?: string;
}

const StudentIcon = {
  CREATED: <Rectify size={16} />,
  SUBMITTED: <CheckCircle size={16} />,
  SHARED: <Internet />,
};

const StudentDropdown = ({
  classList,
  classNum,
  moveClickedPage,
  id,
  grade,
  currentPage,
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
      {!moveClickedPage &&
        open &&
        classList?.map(
          ({ name, student_number, student_id, document_status, page }) => {
            return (
              <li
                key={student_id}
                onClick={() => push(`/${student_id}`)}
                className={`flex text-[14px] cursor-pointer ${
                  id === student_id && "bg-gray100 text-gray700"
                } py-2 rounded-md px-3 justify-between items-center [&_path]:fill-gray400 hover:bg-gray500`}
              >
                <span className={"flex"}>
                  {student_number} {name}
                </span>
                {document_status && StudentIcon[document_status]}
              </li>
            );
          }
        )}
      {moveClickedPage && (
        <>
          <ClassDropdown
            classNumber={1}
            classList={classList}
            moveClickedPage={moveClickedPage}
            id={id}
            currentPage={currentPage}
          />
          <ClassDropdown
            classNumber={2}
            classList={classList}
            moveClickedPage={moveClickedPage}
            id={id}
            currentPage={currentPage}
          />
          <ClassDropdown
            classNumber={3}
            classList={classList}
            moveClickedPage={moveClickedPage}
            id={id}
            currentPage={currentPage}
          />
          <ClassDropdown
            classNumber={4}
            classList={classList}
            moveClickedPage={moveClickedPage}
            id={id}
            currentPage={currentPage}
          />
        </>
      )}
    </>
  );
};

function ClassDropdown({
  classList,
  moveClickedPage,
  id,
  classNumber,
  currentPage,
}: {
  classList: StudentListType;
  moveClickedPage?: (page: number) => void;
  id?: string;
  classNumber: number;
  currentPage?: string;
}) {
  const { push } = useRouter();

  const getNameByList = (list: StudentListType) => {
    return list?.filter((l) => (l.page as number) <= Number(currentPage)).pop()
      ?.name;
  };

  return (
    <nav className="overflow-scroll">
      <ul className="flex flex-col gap-2">
        <div>
          <input
            type="checkbox"
            className="peer appearance-none"
            id={"classCheckbox" + classNumber}
          />
          <label
            className="flex h-12 rounded-md bg-gray600 justify-between items-center px-4 peer-checked:[&_svg]:rotate-90 peer-checked:[&_svg_path]:fill-gray900 peer-checked:bg-gray50 peer-checked:text-gray900"
            htmlFor={"classCheckbox" + classNumber}
          >
            <h1>{classNumber}반</h1>
            <Arrow
              size={24}
              direction="bottom"
              className={"[&_path]:fill-gray50"}
            />
          </label>
          <div className="peer-checked:flex hidden flex-col gap-1 mt-2">
            {classList
              ?.filter(
                (c) =>
                  c.student_number.toString().slice(1, 2) ===
                  String(classNumber)
              )
              .map(
                ({
                  student_id,
                  student_number,
                  document_status,
                  name,
                  page,
                }) => (
                  <li
                    key={student_id}
                    onClick={() =>
                      moveClickedPage
                        ? moveClickedPage(page!)
                        : push(`/${student_id}`)
                    }
                    className={`transition-all ${
                      name === getNameByList(classList)
                        ? "bg-gray100 text-gray700"
                        : "hover:bg-gray600"
                    } flex text-[14px] cursor-pointer py-2 rounded-md px-3 justify-between items-center [&_path]:fill-gray400`}
                  >
                    <span className={"flex"}>
                      {student_number} {name}
                    </span>
                    {document_status && StudentIcon[document_status]}
                  </li>
                )
              )}
          </div>
        </div>
      </ul>
    </nav>
  );
}
