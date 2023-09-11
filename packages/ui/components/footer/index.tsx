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
    <footer className={`flex justify-center items-center h-72 ${blackClass}`}>
      <div className="w-[1330px]">
        <div className="flex jusify-center items-center justify-between">
          <div className="text-title1">REPO</div>
          <nav className="flex gap-5">
            <Link href={"https://github.com/EntryDSM"}>
              <Github size={26} />
            </Link>
            <Link href={"https://www.facebook.com/entrydsm"}>
              <FaceBook size={26} />
            </Link>
          </nav>
        </div>
        <div className="text-body6 mt-4 mb-6">©2023 Entry</div>
        <div className="text-body7 mb-5">
          주소 : 대전광역시 유성구 가정북로 76 (장동 23-9)
          <br />
          교무실 : 042-866-8822 | Fax : 042-867-9900 | 행정실 : 042-866-8885 |
          Fax : 042-863-4308
        </div>
        <div className="flex justify-between">
          <div className="text-body5">Entrepreneur</div>
          <div className="text-body6">개인정보처리방침 | 이용약관</div>
        </div>
      </div>
    </footer>
  );
};
