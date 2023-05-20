import React from "react";
import Image from "next/image";
import { millsecondToDate } from ".";
import { LinkSvg } from "../../assets";
import { Tag } from "./Tag";
import defaultImg from "../../assets/projectDefaultImg.png";
import Link from "next/link";

interface PropsType {
  represent_image_url: string;
  name: string;
  skill_list: string[];
  start_date: number | string;
  end_date: number | string;
  description: string;
  url?: string;
}

export const Project = ({
  represent_image_url,
  name,
  skill_list,
  start_date,
  end_date,
  description,
  url,
}: PropsType) => {
  return (
    <div className="flex flex-col gap-10 rounded-md bg-gray50 pl-10 pr-10 pt-7 pb-7">
      <div className="flex items-center">
        <Image
          width={80}
          height={80}
          className={"mr-6 bg-gray300 rounded-md"}
          src={represent_image_url || defaultImg}
          alt="projectImg"
        />
        <div>
          <div className="text-title2">{name}</div>
          <div className="text-body7">
            {millsecondToDate(start_date)} ~ {millsecondToDate(end_date)}
          </div>
        </div>
      </div>
      <div>
        <div className="text-body5 mb-2">사용 기술</div>
        <div className="flex gap-2">
          {skill_list.map((technology) => (
            <Tag className="bg-gray100" technology={technology} />
          ))}
        </div>
      </div>
      <div>{description}</div>
      {url && (
        <Link
          href={url}
          className="flex gap-2 bg-gray100 pl-3 pr-3 pt-2 pb-2 rounded-md w-fit"
        >
          <LinkSvg />
          <div>{url}</div>
        </Link>
      )}
    </div>
  );
};
