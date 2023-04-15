import { ReactNode } from "react";
import { Button, TextArea } from "../../../../packages/ui";
import { HeaderBack } from "./HeaderBack";
import { Header } from "./header";
import Link from "next/link";
import { Footer } from "./footer";

interface PropsType {
  children: ReactNode;
}

const link = {
  My: "내 정보",
  Introduce: "자기소개",
  Project: "프로젝트",
  Awards: "수상",
  Certificate: "자격증",
};

export const ResumeLayout = ({ children }: PropsType) => (
  <div>
    <Header />
    <HeaderBack>
      <div className="w-[1120px] m-auto">
        <p className="text-title1 text-gray50">이력서 관리</p>
        <p className="text-title4 flex justify-between text-gray50">
          Resumé Management
          <div className="flex gap-[15px]">
            <Button width={88} kind="outline" radius="normal">
              임시 저장
            </Button>
            <Button width={61} kind="contained" radius="normal">
              제출
            </Button>
          </div>
        </p>

        <div className="flex justify-between">
          <div className="bg-gray50 w-[782px] p-5 rounded-[15px] flex flex-col gap-10">
            {children}
          </div>

          <div className="w-72 flex gap-4 flex-col">
            <div className="bg-gray50 text-title1 text-gray300 pl-9 pt-16 pb-16 rounded-2xl">
              미제출
            </div>
            <div className="bg-gray50 text-body5 rounded-2xl h-11 flex items-center justify-center">
              미리보기
            </div>

            <nav className="bg-gray50 p-5 rounded-2xl">
              {Object.entries(link).map(([key, value]) => (
                <Link href={"/resume/" + key}>
                  <div className="flex justify-center items-center h-14 text-body5">
                    {value}
                  </div>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <Footer />
    </HeaderBack>
  </div>
);
