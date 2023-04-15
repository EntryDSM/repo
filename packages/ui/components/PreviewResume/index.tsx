import React from "react";
import qr from "../../assets/qr.png";
import dummy from "../../assets/dummy.png";
import { Award } from "./Award";
import { Certificate } from "./Certificate";
import { Tag } from "./Tag";
import { LinkSvg } from "../../assets";

interface Props {
  name: string;
  field: string;
  developClass: string;
  email: string;
  tell: string;
  introduction: string;
  aboutMe: string;
  technologyList: string[];
  awards: string;
  Image: any;
}

export const PreviewResume = ({
  name,
  field,
  developClass,
  email,
  tell,
  introduction,
  aboutMe,
  technologyList,
  Image,
}: Props) => {
  return (
    <div className="w-[800px] m-auto mt-28 flex flex-col gap-7">
      <div className="flex justify-between">
        <div>
          <p className="text-title1">{name}</p>
          <p className="text-title4">{field}</p>
        </div>
        <div className="flex">
          <div className="flex justify-between flex-col mr-6 text-end">
            <p className="text-body7">{developClass}</p>
            <p className="text-body7">{email}</p>
            <p className="text-body7">{tell}</p>
          </div>
          <div>
            <Image src={qr} />
          </div>
        </div>
      </div>

      <div>
        <div className="text-body3">{introduction}</div>
        <div className="text-body8 text-gray400 mt-4">{aboutMe}</div>
      </div>

      <div>
        <div className="text-body5 mb-3">기술 스택</div>
        <div className="flex gap-3">
          {technologyList.map((technology) => (
            <Tag className="bg-gray50" technology={technology} />
          ))}
        </div>
      </div>

      <div>
        <div className="text-body5 mb-3">수상 경력</div>
        <div className="flex gap-3 flex-col">
          <Award />
          <Award />
          <Award />
        </div>
      </div>

      <div>
        <div className="text-body5 mb-3">자격증</div>
        <div className="flex gap-3 flex-col">
          <Certificate />
          <Certificate />
          <Certificate />
        </div>
      </div>

      <div>
        <div className="text-body5 mb-2">Project</div>
        <div className="flex flex-col gap-7 bg-gray50 pl-10 pr-10 pt-7 pb-7">
          <div className="flex items-center">
            <Image className={"w-20 h-20 mr-6"} src={dummy} />
            <div>
              <div className="text-title2">REPO</div>
              <div className="text-body7">2022.01.11 ~ 2023.12.31</div>
            </div>
          </div>
          <div>
            <div className="text-body5 mb-3">사용 기술</div>
            <div className="flex gap-3">
              {technologyList.map((technology) => (
                <Tag className="bg-gray100" technology={technology} />
              ))}
            </div>
          </div>
          <div>
            문제파악부터 설계, 평가까지 복잡한 프로세스를 거쳐 만든 프로그램이
            좋은 평가를 받을 때, 그 어떤 일보다 큰 성취감을 느낍니다. 읽기 쉬운
            코드, 모듈화가 쉬운 코드를 지향하며 꾸준히 첫번째, 이렇게 저렇게
            했습니다. 이런저런 기술을 적극 도입했습니다. 성장하는 개발자가
            되고싶습니다. 문제파악부터 설계, 평가까지 복잡한 프로세스를 거쳐
            만든 프로그램이문제파악부터 설계, 평가까지 복잡한 프로세스를 거쳐
            만든 프로그램이 좋은 평가를 받을 때, 그 어떤 일보다 큰 성취감을
            느낍니다. 읽기 쉬운 코드, 모듈화가 쉬운 코드를 지향하며 꾸준히
            성장하는 개발자가 되고싶습니다.
          </div>
          <div className="flex gap-2 bg-gray100 pl-3 pr-3 pt-2 pb-2 rounded-md w-fit">
            <LinkSvg />
            <div>https://www.dsm-repo.com/</div>
          </div>
        </div>
      </div>
    </div>
  );
};
