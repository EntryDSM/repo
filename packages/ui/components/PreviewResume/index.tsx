import React, { MutableRefObject, ReactNode } from "react";
import { Award } from "./Award";
import { Certificate } from "./Certificate";
import { Project } from "./Project";
import { Activity } from "./Activity";
import { Tag } from "./Tag";
import QRCode from "qrcode.react";

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
    url?: string | null;
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
    represent_image_path: string;
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
    description: string; // null 가능
    feedback?: string | null; // null 가능
  }[];
  certificate_list: {
    element_id: string;
    name: string;
    issuing_institution: string;
    date: number | string;
    feedback?: string | null; // null 가능
  }[];
  activity_list: {
    element_id: string;
    name: string;
    date: number | string;
    end_date: number | string; // null 가능
    is_period: boolean;
    description: string; // null 가능
    feedback?: string | null; // null 가능
  }[];
  targetRef?: MutableRefObject<HTMLDivElement | null>;
  FeedbackBox?: (props: FeedbackBoxType) => JSX.Element;
}

const zeroNumber = (value: number) => `${value < 10 ? "0" : ""}${value}`

export const millsecondToDate = (str: number | string) => {
  const date = new Date(str || 0);
  return `${date.getFullYear()}. ${zeroNumber(date.getMonth())}. ${zeroNumber(date.getDay())}`;
};

const subject = {
  1: "소프트웨어개발과",
  2: "소프트웨어개발과",
  3: "임베디드소프트웨어과",
  4: "정보보안과",
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
  activity_list,
  targetRef,
  FeedbackBox,
}: PreviewType) => {
  const FeedBack = (props: Omit<FeedbackBoxType, "document_id">): JSX.Element =>
    FeedbackBox ? (
      <FeedbackBox document_id={document_id} {...props} />
    ) : (
      <>{props.children}</>
    );
  const feedbackWidth = FeedbackBox ? "w-[848px] ml-[48px]" : "w-[800px] ";

  const [grade, classNum] = writer.student_number.toString().split("");

  return (
    <main
      className={`${feedbackWidth} m-auto my-20 flex flex-col gap-[40px] p-8 justify-between`}
      ref={targetRef}
    >
      <article>
        <FeedBack
          part="기본정보"
          element_id={writer.element_id}
          comment={writer.feedback}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-title1 mb-[10px]">{writer.name}</p>
              <p className="text-title4">{writer.major.name}</p>
            </div>
            <div className="flex">
              <div className="flex flex-col mr-6 text-end gap-[10px] justify-center">
                <p className="text-body7 leading-[17px]">
                  {writer.student_number}
                </p>
                <p className="text-body7 leading-[17px]">
                  {grade !== "1" ? subject[classNum as "1"] : "공통과정"}
                </p>
                <p className="text-body7 leading-[17px]">{writer.email}</p>
              </div>
              {writer.url && (
                <div>
                  <QRCode size={80} value={writer.url} />
                </div>
              )}
            </div>
          </div>
        </FeedBack>
      </article>

      <article>
        <FeedBack
          part="자기소개"
          element_id={introduce.element_id}
          comment={introduce.feedback}
        >
          <div>
            <h3 className="text-body3">{introduce.heading}</h3>
            <pre className="text-body7 whitespace-pre-wrap text-gray400 mt-[20px] leading-[17px]">
              {introduce.introduce}
            </pre>
          </div>
        </FeedBack>
      </article>

      {!!skill_list.length && (
        <article className="flex flex-col gap-[10px]">
          <h3 className="text-body5">기술 스택</h3>
          <pre className="flex gap-3 flex-wrap">
            {skill_list.map((skill, index) => (
              <Tag key={index} className="bg-gray50" technology={skill} />
            ))}
          </pre>
        </article>
      )}

      {award_list.length > 0 && <article className="flex gap-[10px] flex-col">
        <h3 className="text-body5">수상 경력</h3>
        {award_list.map((award, index) => (
          <FeedBack
            key={index}
            part={award.name}
            element_id={award.element_id}
            comment={award.feedback}
          >
            <Award {...award} />
          </FeedBack>
        ))}
      </article>}

      {certificate_list.length > 0 && <article className="flex gap-[10px] flex-col">
        <h3 className="text-body5">자격증</h3>
        {certificate_list.map((data, index) => (
          <FeedBack
            key={index}
            part={data.name}
            element_id={data.element_id}
            comment={data.feedback}
          >
            <Certificate {...data} />
          </FeedBack>
        ))}
      </article>}

      {activity_list.length > 0 && <article className="flex gap-[10px] flex-col">
        <h3 className="text-body5">활동</h3>
        {activity_list.map((data, index) => (
          <FeedBack
            key={index}
            part={data.name}
            element_id={data.element_id}
            comment={data.feedback}
          >
            <Activity {...data} />
          </FeedBack>
        ))}
      </article>}

      <article className="flex flex-col gap-[20px]">
        <h3 className="text-[22px] font-semibold leading-[26px]">Project</h3>
        {project_list.map((data, index) => (
          <FeedBack
            key={index}
            part={data.name}
            element_id={data.element_id}
            comment={data.feedback}
          >
            <Project {...data} />
          </FeedBack>
        ))}
      </article>
    </main>
  );
};
