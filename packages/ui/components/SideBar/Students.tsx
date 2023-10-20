import { useRouter } from "next/router";
import React, { useState } from "react";
import { StudentListType } from ".";
import { Arrow, CheckCircle, Internet, Rectify } from "../../assets";
import { Dropdown } from "../Dropdown";

const subject = {
  1: "소프트웨어개발과",
  2: "소프트웨어개발과",
  3: "임베디드소프트웨어과",
  4: "정보보안과",
};

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

  const [dropdown, setDropDown] = useState("학과");

  return (
    <div className="flex flex-col gap-[10px]">
      <Dropdown
        placeholder="학과"
        lists={["학과", "전공"]}
        kind="contained"
        className="w-[150px] text-gray900"
        value={dropdown}
        onClick={({ keyword }) => {
          setDropDown(keyword);
        }}
      />
      
      {dropdown == "학과" && studentList.map((classList, classNum) => (
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

      {dropdown == "전공" && studentList.map((classList, classNum) => (
        <StudentMajorDropdown
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
      {!moveClickedPage &&
        open &&
        classList?.map(
          ({ name, student_number, student_id, major, document_status, page }) => {
            return (
              <li
                key={student_id}
                onClick={() => push(`/${student_id}`)}
                className={`flex text-[14px] cursor-pointer ${
                  id === student_id && "bg-gray100 text-gray700"
                } py-2 rounded-md px-3 justify-between items-center [&_path]:fill-gray400 hover:bg-gray500`}
              >
                <span className={"flex"}>
                  {student_number} {name} <span className="ml-[5px] text-gray400">{major?.name.split(' ')[0]}</span>
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
            grade={grade}
            id={id}
            currentPage={currentPage}
          />
          <ClassDropdown
            classNumber={2}
            classList={classList}
            moveClickedPage={moveClickedPage}
            grade={grade}
            id={id}
            currentPage={currentPage}
          />
          <ClassDropdown
            classNumber={3}
            classList={classList}
            moveClickedPage={moveClickedPage}
            grade={grade}
            id={id}
            currentPage={currentPage}
          />
          <ClassDropdown
            classNumber={4}
            classList={classList}
            moveClickedPage={moveClickedPage}
            grade={grade}
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
  grade,
  currentPage,
}: {
  classList: StudentListType;
  moveClickedPage?: (page: number) => void;
  id?: string;
  classNumber: number;
  grade?: string;
  currentPage?: string;
}) {
  const { push } = useRouter();

  const getNameByList = (list: StudentListType) => {
    return list?.filter((l) => (l.page as number) <= Number(currentPage)).pop()
      ?.name;
  };

  return (
    <nav className="">
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
            <h1>{classNumber}반 {grade !== "1" ? subject[String(classNumber) as "1"] : "공통과정"} 
              ({classList?.filter(
                (c) =>
                  c.student_number.toString().slice(1, 2) ===
                  String(classNumber)
              ).length})
            </h1>
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
                  major,
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
                      {student_number} {name} <span className="ml-[5px] text-gray400">{major?.name} </span>
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


const StudentMajorDropdown = ({
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
      {!moveClickedPage &&
        open &&
        classList?.map(
          ({ name, student_number, student_id, major, document_status, page }) => {
            return (
              <li
                key={student_id}
                onClick={() => push(`/${student_id}`)}
                className={`flex text-[14px] cursor-pointer ${
                  id === student_id && "bg-gray100 text-gray700"
                } py-2 rounded-md px-3 justify-between items-center [&_path]:fill-gray400 hover:bg-gray500`}
              >
                <span className={"flex"}>
                  {student_number} {name} <span className="ml-[5px] text-gray400">{major?.name.split(' ')[0]}
                  </span>
                </span>
                {document_status && StudentIcon[document_status]}
              </li>
            );
          }
        )}
      {moveClickedPage && (
        <>
          {Array.from(new Set(classList?.map((v, i) => v.major?.name)))
            ?.map((value, index) => (
              <MajorDropdown
                major={value}
                classList={classList}
                moveClickedPage={moveClickedPage}
                grade={grade}
                id={id}
                currentPage={currentPage}
              />
            )
          )}
        </>
      )}
    </>
  );
};


function MajorDropdown({
  classList,
  moveClickedPage,
  id,
  grade,
  major,
  currentPage,
}: {
  classList: StudentListType;
  moveClickedPage?: (page: number) => void;
  id?: string;
  grade?: string;
  major?: string;
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
            id={"majorCheckbox" + major}
          />
          <label
            className="flex h-12 rounded-md bg-gray600 justify-between items-center px-4 peer-checked:[&_svg]:rotate-90 peer-checked:[&_svg_path]:fill-gray900 peer-checked:bg-gray50 peer-checked:text-gray900"
            htmlFor={"majorCheckbox" + major}
          >
            <h1>{major} ({classList
              ?.filter(
                (c) => c.major?.name === major
              ).length})</h1>
            <Arrow
              size={24}
              direction="bottom"
              className={"[&_path]:fill-gray50"}
            />
          </label>
          <div className="peer-checked:flex hidden flex-col gap-1 mt-2">
            {classList
              ?.filter(
                (c) => c.major?.name.toString() === major
              )
              .map(
                ({
                  student_id,
                  student_number,
                  document_status,
                  major,
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
                      {student_number} {name} <span className="ml-[5px] text-gray400">{major?.name.split(' ')[0]}</span>
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

