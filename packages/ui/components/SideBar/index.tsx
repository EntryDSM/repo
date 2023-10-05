import Link from "next/link";
import { ReactNode, useState } from "react";
import { Home, Setting, Stack } from "../../assets";
import { WhiteRepoIcon } from "../../assets/WhiteRepoIcon";
import { Students } from "./Students";
import React from "react";
import {useRouter} from "next/router";

export type StudentType = {
  student_id?: string;
  name: string;
  document_id?: string;
  document_status?: "CREATED" | "SUBMITTED" | "SHARED";
  feedback_count?: number;
  profile_image_url?: string;
  student_number: number;
  email?: string;
  major?: {
    id: string;
    name: string;
  };
  page?: number;
};

export type StudentListType = StudentType[] | undefined;

export type ShareFnType = (action: "SHARING" | "UNSHARING") => void;

interface PropType {
  preview?: boolean;
  moveClickedPage?: (page: number) => void;
  studentList?: (StudentType[] | undefined)[];
  Sharing?: () => JSX.Element | null;
  id?: string;
  grade?: string;
  currentPage?: string;
  children: ReactNode;
}

export const SideBar = ({
  preview,
  moveClickedPage,
  studentList,
  Sharing,
  id,
  grade,
  children,
  currentPage,
}: PropType) => {
  const router = useRouter()
  const [side, setSide] = useState<number>(0);

  const currentIcon = {
    1: "[&_path]:[&>*:nth-child(3)]:fill-gray500",
    2: "[&_path]:[&>*:nth-child(4)]:fill-gray500",
  }[side];

  return (
    <header className="flex h-[100vh]">
      <div className="fixed bottom-0 top-0 flex z-20">
        <nav
          className={`bg-gray800 w-20 flex gap-10 flex-col items-center pt-10 ${currentIcon}`}
        >
          <ul>
            <Link href="/">
              <WhiteRepoIcon />
            </Link>
          </ul>
          <ul>
            <button onClick={() => router.back()}>
              <Home />
            </button>
          </ul>
          {!preview && (
            <>
              {studentList && (
                <Stack onClick={() => setSide((v) => (v === 1 ? 0 : 1))} />
              )}
              {Sharing && (
                <Setting onClick={() => setSide((v) => (v === 2 ? 0 : 2))} />
              )}
            </>
          )}
        </nav>
        {!preview && !!side && (
          <div className="bg-gray700 w-60 text-gray50 pl-6 pr-6 pt-10 overflow-y-scroll">
            {
              {
                1: studentList && (
                  <Students
                    studentList={studentList}
                    id={id}
                    grade={grade}
                    moveClickedPage={moveClickedPage}
                    currentPage={currentPage}
                  />
                ),
                2: Sharing && <Sharing />,
              }[side]
            }
          </div>
        )}
      </div>
      {!preview && !!side && <div className="w-[320px]" />}
      <div className="w-full ml-20 flex justify-center">{children}</div>
    </header>
  );
};
