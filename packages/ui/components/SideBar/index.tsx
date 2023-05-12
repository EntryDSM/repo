import React, { ReactNode, useState } from "react";
import { WhiteRepoIcon } from "../../assets/WhiteRepoIcon";
import { Home, Setting, Stack } from "../../assets";
import { Sharing } from "./Sharing";
import { Students } from "./Students";
import Link from "next/link";

interface StudentType {
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
}

export type StudentListType = StudentType[] | undefined;

export type ShareFnType = (action: "SHARING" | "UNSHARING") => void;

interface Props {
  preview?: boolean;
  studentList?: (StudentType[] | undefined)[];
  status?: "CREATED" | "SUBMITTED" | "SHARED";
  sharingFn?: ShareFnType;
  id?: string;
  grade?: string;
  children: ReactNode;
}

export const SideBar = ({
  preview,
  studentList,
  status,
  sharingFn,
  id,
  grade,
  children,
}: Props) => {
  const [side, setSide] = useState<number>(0);

  const currentIcon = {
    0: "[&_path]:[&>*:nth-child(2)]:fill-gray500",
    1: "[&_path]:[&>*:nth-child(3)]:fill-gray500",
    2: "[&_path]:[&>*:nth-child(4)]:fill-gray500",
  }[side];
  return (
    <div className="flex h-[100vh]">
      <div className="fixed bottom-0 top-0 flex z-20">
        <div
          className={`bg-gray800 w-20 flex gap-10 flex-col items-center pt-10 ${currentIcon}`}
        >
          <Link href="/">
            <WhiteRepoIcon />
          </Link>
          <Home onClick={() => setSide(0)} />
          {!preview && (
            <>
              {studentList && <Setting onClick={() => setSide(1)} />}
              {status && sharingFn && <Stack onClick={() => setSide(2)} />}
            </>
          )}
        </div>
        {!preview && !!side && (
          <div className="bg-gray700 w-60 text-gray50 pl-6 pr-6 pt-10">
            {
              {
                1: studentList && (
                  <Students studentList={studentList} id={id} grade={grade} />
                ),
                2: status && sharingFn && (
                  <Sharing status={status} sharingFn={sharingFn} />
                ),
              }[side]
            }
          </div>
        )}
      </div>
      {!preview && !!side && <div className="w-[320px]" />}
      <div className="m-auto">{children}</div>
    </div>
  );
};
