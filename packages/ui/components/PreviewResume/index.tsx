import React, { ReactNode } from "react";
import qr from "../../assets/qr.png";
import dummy from "../../assets/dummy.png";
import { Award } from "./Award";
import { Certificate } from "./Certificate";
import { Project } from "./Project";
import { Tag } from "./Tag";
import { LinkSvg } from "../../assets";
import Image from "next/image";

export interface FeedbackBoxType {
  part: string;
  document_id: string;
  element_id: string;
  comment?: string | null;
  children?: ReactNode;
}

export interface PreviewType {
  document_id: string;
  writer: {
    element_id: string;
    student_id: string;
    feedback?: string | null;
    name: string;
    profile_image_url: string;
    student_number: number; // 원하면 학년 반 번호로 각각 나눠서 줄 수도 있음
    email: string;
    major: {
      id: string;
      name: string;
    };
  };
  document_status: string;
  introduce: {
    element_id: string;
    feedback?: string | null;
    heading: string;
    introduce: string;
  };
  skill_list: string[];
  project_list: {
    element_id: string;
    name: string;
    represent_image_url: string;
    skill_list: string[];
    start_date: number | string;
    end_date: number | string;
    description: string;
    url?: string; //null 가능
    feedback?: string | null; // null 가능
  }[];
  award_list: {
    element_id: string;
    name: string;
    awarding_institution: string;
    date: number | string;
    description: string; //null 가능
    feedback?: string | null; // null 가능
  }[];
  certificate_list: {
    element_id: string;
    name: string;
    issuing_institution: string;
    date: number | string;
    feedback?: string | null; // null 가능
  }[];
  FeedbackBox?: (props: FeedbackBoxType) => JSX.Element;
}

export const millsecondToDate = (str: number | string) => {
  const date = new Date(str || 0);
  return date.toLocaleDateString();
};

const subject = {
  1: "소프트웨어과",
  2: "소프트웨어과",
  3: "임베디드과",
  4: "정보기기과",
};

export const PreviewResume = ({
  document_id,
  writer,
  document_status,
  introduce,
  skill_list,
  project_list,
  award_list,
  certificate_list,
  FeedbackBox,
}: PreviewType) => {
  const FeedBack = (props: Omit<FeedbackBoxType, "document_id">): JSX.Element =>
    FeedbackBox ? (
      <FeedbackBox document_id={document_id} {...props} />
    ) : (
      <>{props.children}</>
    );
  const feedbackWidth = FeedbackBox ? "w-[848px]" : "w-[800px]";

  const [grade, classNum] = writer.student_number.toString().split("");

  return (
    <div className={`${feedbackWidth} m-auto my-20 flex flex-col gap-8 p-8`}>
      <div>
        <FeedBack
          part="기본정보"
          element_id={writer.element_id}
          comment={writer.feedback}
        >
          <div className="flex justify-between">
            <div>
              <p className="text-title1">{writer.name}</p>
              <p className="text-title4">{writer.major.name}</p>
            </div>
            <div className="flex">
              <div className="flex justify-between flex-col mr-6 text-end">
                <p className="text-body7">
                  {grade !== "1" ? subject[classNum as "1"] : "공통학과"}
                </p>
                <p className="text-body7">{writer.email}</p>
                <p className="text-body7">{"010-1234-5678"}</p>
              </div>
              <div>
                <Image width={80} height={80} src={qr} alt="qr img" />
              </div>
            </div>
          </div>
        </FeedBack>
      </div>

      <div>
        <FeedBack
          part="자기소개"
          element_id={introduce.element_id}
          comment={introduce.feedback}
        >
          <div>
            <div className="text-body3">{introduce.heading}</div>
            <div className="text-body8 text-gray400 mt-4">
              {introduce.introduce}
            </div>
          </div>
        </FeedBack>
      </div>

      <div>
        {!!skill_list.length && (
          <div>
            <div className="text-body5 mb-3">기술 스택</div>
            <div className="flex gap-3">
              {skill_list.map((skill) => (
                <Tag className="bg-gray50" technology={skill} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3 flex-col">
        <div className="text-body5">수상 경력</div>
        {award_list.map((award) => (
          <FeedBack
            part={award.name}
            element_id={award.element_id}
            comment={award.feedback}
          >
            <Award {...award} />
          </FeedBack>
        ))}
      </div>

      <div className="flex gap-2 flex-col">
        <div className="text-body5">자격증</div>
        {certificate_list.map((data) => (
          <FeedBack
            part={data.name}
            element_id={data.element_id}
            comment={data.feedback}
          >
            <Certificate {...data} />
          </FeedBack>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-body1">Project</div>
        {project_list.map((data) => (
          <FeedBack
            part={data.name}
            element_id={data.element_id}
            comment={data.feedback}
          >
            <Project {...data} />
          </FeedBack>
        ))}
      </div>
    </div>
  );
};
