import Link from "next/link";
import { ReactNode } from "react";
import { Button } from "@packages/ui";
import { Header } from "../header";
import { Footer } from "../footer";
import { Check } from "@packages/ui/assets";
import { useRouter } from "next/router";

interface PropsType {
  children: ReactNode;
  mutate?: any;
  state?: any;
}

const link = {
  my: "내 정보",
  introduce: "자기소개",
  project: "프로젝트",
  awards: "수상",
  certificate: "자격증",
};

export const ResumeLayout = ({ children, mutate, state }: PropsType) => {
  const { route } = useRouter();
  return (
    <div>
      <Header />
      <div className="mt-[120px]">
        <div className="absolute top-20 w-full h-[360px] bg-gray900" />
        <div className="relative z-2">
          <div className="w-[1120px] m-auto flex flex-col gap-10 mb-52">
            <div>
              <p className="text-title1 text-gray50">이력서 관리</p>
              <p className="text-title4 flex justify-between text-gray50">
                Resumé Management
                <div className="flex gap-[15px]">
                  <Button
                    onClick={() => mutate(state)}
                    className="w-[100px]"
                    kind="outlineWhite"
                    radius="normal"
                  >
                    임시 저장
                  </Button>
                  <Button
                    className="w-[61px]"
                    kind="containedWhite"
                    radius="normal"
                  >
                    제출
                  </Button>
                </div>
              </p>
            </div>

            <div className="flex justify-between">
              <div className="bg-gray50 w-[782px] p-5 rounded-[15px] flex flex-col gap-10">
                {children}
              </div>

              <div className="w-72 flex gap-4 flex-col">
                <div className="bg-gray50 text-title1 text-gray300 pl-9 pt-16 pb-16 rounded-2xl">
                  미제출
                </div>
                <Button className="rounded-2xl hover:bg-gray200">
                  미리보기
                </Button>

                <nav className="bg-gray50 p-5 rounded-2xl">
                  {Object.entries(link).map(([key, value]) => (
                    <Link href={"/resume/" + key}>
                      <button
                        className={`w-full rounded-md box-border pl-[18px] pr-[18px] px-[18px] h-[60px] text-body8 flex items-center justify-between gap-x-[15px] shrink-0 hover:bg-gray100  ${
                          route.includes(key) ? "bg-gray100" : ""
                        }`}
                      >
                        {value}
                        <Check size={24} color />
                      </button>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
