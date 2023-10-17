import React from "react";
import { millisecondToDate } from "../../utils/timeUtils";
import { LinkSvg } from "../../assets";
import { Tag } from "./Tag";
import defaultImg from "../../assets/projectDefaultImg.png";
import Link from "next/link";
import Image from "next/image";

interface PropsType {
  represent_image_path: string;
  name: string;
  skill_list: string[];
  start_date: number | string;
  end_date: number | string;
  is_period: boolean;
  type: string;
  description: string;
  urls?: string[];
}

export const Project = ({
  represent_image_path,
  name,
  skill_list,
  start_date,
  end_date,
  is_period,
  type,
  description,
  urls,
}: PropsType) => {
  const imageUrl = represent_image_path;
  return (
    <div className="flex flex-col gap-5 rounded-md bg-gray50 m-0 pl-10 pr-10 pt-7 pb-7 w-full h-full">
      <div className="flex items-center w-full">
        <div className="mr-[40px] overflow-hidden flex justify-center items-center w-[48px] h-[48px]">
          {imageUrl ? (
            <Image
              width={48}
              height={48}
              src={
                "https://s3.ap-northeast-2.amazonaws.com/dsm-repo/" + imageUrl
              }
              alt="projectImg"
            />
          ) : (
            <Image width={48} height={48} src={defaultImg} alt="projectImg" />
          )}
        </div>
        <div className="flex items-center w-full justify-between">
          <div className="flex flex-col gap-[4px]">
            <p className="text-title3">{name}</p>
            <p className="text-[14px] leading-[17px]">
              {millisecondToDate(start_date)} ~{" "}
              {is_period ? millisecondToDate(end_date) : "진행중"}
            </p>
          </div>
          <p className="text-body8 text-gray300">
            {type === "TEAM"
              ? "팀프로젝트"
              : type === "PERSONAL"
              ? "개인프로젝트"
              : ""}
          </p>
        </div>
      </div>
      <div>
        <h4 className="text-body5 mb-2">사용 기술</h4>
        <div className="flex gap-2 flex-wrap">
          {skill_list.map((technology, index) => (
            <Tag key={index} className="bg-gray100" technology={technology} />
          ))}
        </div>
      </div>
      <pre className="text-body7 leading-6 text-[15px] font-normal whitespace-pre-wrap truncate line-clamp-[38]">
        {description}
      </pre>
      {urls && (
        <div className="flex flex-wrap gap-2">
          {urls.map((value, index) => (
            <div key={index} className="h-fit">
              <Link
                key={index}
                href={value}
                className="flex items-center gap-2 bg-gray100 pl-2 pr-2 pt-0 pb-0 rounded-md w-fit max-w-full flex-1"
              >
                <LinkSvg />
                <p className="text-ellipsis overflow-hidden break-all text-[12px]">
                  {value}
                </p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
