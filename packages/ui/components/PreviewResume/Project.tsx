import React from "react";
import { millsecondToDate } from ".";
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
  description: string;
  url?: string;
}

export const Project = ({
  represent_image_path,
  name,
  skill_list,
  start_date,
  end_date,
  description,
  url,
}: PropsType) => {
  const imageUrl = represent_image_path;
  console.log(represent_image_path);
  return (
    <div className="flex flex-col gap-10 rounded-md bg-gray50 pl-10 pr-10 pt-7 pb-7 w-full">
      <div className="flex items-center">
        {imageUrl ? (
          <Image
            width={48}
            height={48}
            className="mr-[40px] object-cover w-[48px] h-[48px]"
            src={"https://s3.ap-northeast-2.amazonaws.com/dsm-repo/" + imageUrl}
            alt="projectImg"
          />
        ) : (
          <Image
            width={48}
            height={48}
            className="mr-[40px] object-cover w-[48px] h-[48px]"
            src={defaultImg}
            alt="projectImg"
          />
        )}
        <div className="flex flex-col gap-[4px]">
          <p className="text-title3">{name}</p>
          <p className="text-[14px] leading-[17px]">
            {millsecondToDate(start_date)} ~ {millsecondToDate(end_date)}
          </p>
        </div>
      </div>
      <div>
        <h4 className="text-body5 mb-2">사용 기술</h4>
        <div className="flex gap-2">
          {skill_list.map((technology, index) => (
            <Tag key={index} className="bg-gray100" technology={technology} />
          ))}
        </div>
      </div>
      <pre className="text-body7 whitespace-pre-wrap">{description}</pre>
      {url && (
        <Link
          href={url}
          className="flex gap-2 bg-gray100 pl-3 pr-3 pt-2 pb-2 rounded-md w-fit max-w-full flex-1"
        >
          <LinkSvg />

          <p className="text-ellipsis overflow-hidden whitespace-normal">
            {url}
          </p>
        </Link>
      )}
    </div>
  );
};
