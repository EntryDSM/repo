import React, { ReactNode, useState } from "react";
import { WhiteRepoIcon } from "../../assets/WhiteRepoIcon";
import { Home, Setting, Stack } from "../../assets";
import { Sharing } from "./Sharing";
import { Students } from "./Students";

interface StudentType {
  student_id: string;
  name: string;
  document_id: string;
  document_status: "CREATED" | "SUBMITTED" | "SHARING";
  feedback_count: number;
  profile_image_url: string;
  student_number: number;
  email: string;
  major: {
    id: string;
    name: string;
  };
}

export type StudentListType = StudentType[] | undefined;

export type ShareFnType = (action: "SHARING" | "UNSHARING") => void;

interface Props {
  preview?: boolean;
  studentList: (StudentType[] | undefined)[];
  status?: "CREATED" | "SUBMITTED" | "SHARING";
  sharingFn: ShareFnType;
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

  return (
    <div className="flex h-[100vh]">
      <div className="fixed bottom-0 top-0 flex z-20">
        <div className=" bg-gray800 w-20 flex gap-10 flex-col items-center pt-10">
          <div>
            <WhiteRepoIcon />
          </div>
          <Home onClick={() => setSide(0)} />
          {!preview && (
            <>
              <Setting onClick={() => setSide(1)} />
              <Stack onClick={() => setSide(2)} />
            </>
          )}
        </div>
        {!preview && !!side && (
          <div className="bg-gray700 w-60 text-gray50 pl-6 pr-6 pt-10">
            {
              {
                1: <Students studentList={studentList} id={id} grade={grade} />,
                2: <Sharing status={status} sharingFn={sharingFn} />,
              }[side]
            }
          </div>
        )}
      </div>
      {!preview && !!side && <div className="w-[320px]" />}
      <div className="flex-auto">{children}</div>
    </div>
  );
};
