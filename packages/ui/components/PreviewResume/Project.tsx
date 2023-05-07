import React from "react";
import Image from "next/image";
import { millsecondToDate } from ".";
import { LinkSvg } from "../../assets";
import { Tag } from "./Tag";
import defaultImg from "../../assets/projectDefaultImg.png";

interface PropsType {
  represent_image_url: string;
  name: string;
  skill_list: string[];
  start_date: number;
  end_date: number;
  description: string;
  url: string;
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
    <div className="flex flex-col gap-7 rounded-md bg-gray50 pl-10 pr-10 pt-7 pb-7">
      <div className="flex items-center">
        <Image
          className={"w-20 h-20 mr-6"}
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
  );
};
