import React from "react";
import qr from "../../assets/qr.png";
import dummy from "../../assets/dummy.png";
import defaultImg from "../../assets/projectDefaultImg.png";
import { Award } from "./Award";
import { Certificate } from "./Certificate";
import { Tag } from "./Tag";
import { LinkSvg } from "../../assets";

export interface PreviewType {
  document_id: string;
  writer: {
    element_id: string;
    student_id: string;
    name: string;
    profile_image_path: string;
    student_number: string; // 원하면 학년 반 번호로 각각 나눠서 줄 수도 있음
    email: string;
    major: {
      id: string;
      name: string;
    };
  };
  status: string;
  introduce: {
    element_id: string;
    heading: string;
    introduce: string;
  };
  skill_list: string[];
  project_list: {
    element_id: string;
    name: string;
    represent_image_path: string;
    skill_list: string[];
    start_date: number;
    end_date: number;
    description: string;
    url: string; //null 가능
    feedback?: string | null; // null 가능
  }[];
  award_list: {
    element_id: string;
    name: string;
    awarding_institution: string;
    date: number;
    description: string; //null 가능
    url: string; //null 가능
    feedback?: string | null; // null 가능
  }[];
  certificate_list: {
    element_id: string;
    name: string;
    issuing_institution: string;
    date: number;
    feedback?: string | null; // null 가능
  }[];
  NextImage: any;
}

export const millsecondToDate = (str: number) => {
  const date = new Date(str);
  return date.toLocaleDateString();
};

export const PreviewResume = ({
  document_id,
  writer,
  status,
  introduce,
  skill_list,
  project_list,
  award_list,
  certificate_list,
  NextImage,
}: PreviewType) => {
  const { name, profile_image_path, student_id, element_id, email, major } =
    writer;
  const { heading, introduce: aboutMe } = introduce;

  return (
    <div className="w-[800px] m-auto mt-28 flex flex-col gap-7">
      <div className="flex justify-between">
        <div>
          <p className="text-title1">{name}</p>
          <p className="text-title4">{major.name}</p>
        </div>
        <div className="flex">
          <div className="flex justify-between flex-col mr-6 text-end">
            <p className="text-body7">{"소개과"}</p>
            <p className="text-body7">{email}</p>
            <p className="text-body7">{"010-8355"}</p>
          </div>
          <div>
            <NextImage src={qr} />
          </div>
        </div>
      </div>

      <div>
        <div className="text-body3">{heading}</div>
        <div className="text-body8 text-gray400 mt-4">{aboutMe}</div>
      </div>

      <div>
        <div className="text-body5 mb-3">기술 스택</div>
        <div className="flex gap-3">
          {skill_list.map((skill) => (
            <Tag className="bg-gray50" technology={skill} />
          ))}
        </div>
      </div>

      <div>
        <div className="text-body5 mb-3">수상 경력</div>
        <div className="flex gap-3 flex-col">
          {award_list.map((award) => (
            <Award {...award} />
          ))}
        </div>
      </div>

      <div>
        <div className="text-body5 mb-3">자격증</div>
        <div className="flex gap-3 flex-col">
          {certificate_list.map((data) => (
            <Certificate {...data} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="text-body1 mb-2">Project</div>
        {project_list.map(
          ({
            name,
            represent_image_path,
            skill_list,
            start_date,
            end_date,
            description,
            url,
          }) => (
            <div className="flex flex-col gap-7 rounded-md bg-gray50 pl-10 pr-10 pt-7 pb-7">
              <div className="flex items-center">
                <NextImage
                  className={"w-20 h-20 mr-6"}
                  src={represent_image_path || defaultImg}
                />
                <div>
                  <div className="text-title2">{name}</div>
                  <div className="text-body7">
                    {millsecondToDate(start_date)} ~{" "}
                    {millsecondToDate(end_date)}
                  </div>
                </div>
              </div>
              <div>
                <div className="text-body5 mb-3">사용 기술</div>
                <div className="flex gap-3">
                  {skill_list.map((technology) => (
                    <Tag className="bg-gray100" technology={technology} />
                  ))}
                </div>
              </div>
              <div>{description}</div>
              <div className="flex gap-2 bg-gray100 pl-3 pr-3 pt-2 pb-2 rounded-md w-fit">
                <LinkSvg />
                <div>{url}</div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
