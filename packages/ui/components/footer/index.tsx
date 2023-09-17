import React from "react";
import { Github, FaceBook } from "@packages/ui/assets";
import Link from "next/link";

interface PropsType {
  black?: boolean;
}

export const Footer = ({ black }: PropsType) => {
  const blackClass = black
    ? "bg-gray900 [&_div]:text-gray50 [&_path]:fill-gray50"
    : "bg-gray100";
  return (
    <footer className={`w-full px-[40px] sm:px-[20px] flex justify-center items-center h-[300px] ${blackClass}`}>
      <div className="sm:w-full md:w-full lg:w-[1320px]">
        <div className="flex jusify-center items-center justify-between">
          <p className="text-title1">REPO</p>
          <nav className="flex gap-5">
            <Link href={"https://github.com/EntryDSM"}>
              <Github size={26} />
            </Link>
            <Link href={"https://www.facebook.com/entrydsm"}>
              <FaceBook size={26} />
            </Link>
          </nav>
        </div>
        <p className="text-body6 mt-[18px] mb-[20px]">©2023 Entry</p>
        <p className="text-body7 mb-[20px]">
          주소 : 대전광역시 유성구 가정북로 76 (장동 23-9)
          <br />
          교무실 : 042-866-8822 | Fax : 042-867-9900 | 행정실 : 042-866-8885 |
          Fax : 042-863-4308
        </p>
        <div className="flex justify-between">
          <p className="text-body5">Entrepreneur</p>
          <p className="text-body6">개인정보처리방침 | 이용약관</p>
        </div>
      </div>
    </footer>
  );
};
