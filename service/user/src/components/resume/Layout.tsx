import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { Button, Footer } from "@packages/ui";
import { Header } from "../header";
import { Check } from "@packages/ui/assets";
import { useRouter } from "next/router";
import { documentSubmit } from "@/apis/document/post/submit";

interface PropsType {
  children: ReactNode;
  mutate?: any;
  toPreview: () => string;
  profileImg?: string;
  status?: "CREATED" | "SUBMITTED" | "SHARED";
}

const link = {
  my: "내 정보",
  introduce: "자기소개",
  project: "프로젝트",
  awards: "수상",
  certificate: "자격증",
};

const documentStatus = {
  CREATED: "미제출",
  SUBMITTED: "제출됨",
  SHARED: "공유됨",
};

export const ResumeLayout = ({
  children,
  mutate,
  profileImg,
  toPreview,
  status = "CREATED",
}: PropsType) => {
  const { route, push } = useRouter();
  const isNotSubmit = status !== "CREATED";
  const [submit, setSubmit] = useState<boolean>(!isNotSubmit);

  useEffect(() => setSubmit(!isNotSubmit), [status]);
  const submitChange = () => {
    documentSubmit(submit);
    setSubmit(!submit);
  };

  const toOtherProfileWrite = (link: string) => {
    if (route.includes(link)) return;
    mutate();
    push("/resume/" + link);
  };

  const toPathPreview = () => push("/" + toPreview());
  return (
    <>
      <Header profileImg={profileImg} />
      <div className="mt-[120px]">
        <div className="absolute top-20 w-full h-[360px] bg-gray900" />
        <div className="relative z-2">
          <div className="w-[1120px] m-auto flex flex-col gap-[32px] mb-[200px]">
            <div className="flex justify-between items-end text-gray50">
              <div className="flex gap-[10px] flex-col">
                <p className="text-title1 text-gray50">이력서 관리</p>
                <p className="text-title4">Resumé Management</p>
              </div>
              <div className="flex gap-[15px] h-fit">
                <Button
                  onClick={mutate}
                  className="w-[100px]"
                  kind="outlineWhite"
                  radius="normal"
                >
                  저장
                </Button>
                <Button
                  className="w-[61px]"
                  kind="containedWhite"
                  radius="normal"
                  onClick={submitChange}
                >
                  {submit ? "제출" : "취소"}
                </Button>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="bg-gray50 w-[782px] py-10 px-5 rounded-[15px] flex flex-col gap-10">
                {children}
              </div>

              <div className="w-72 flex gap-4 flex-col">
                <div
                  className={`bg-gray50 text-title1 ${
                    submit ? "text-gray300" : "text-gray800"
                  } pl-9 pt-16 pb-16 rounded-2xl`}
                >
                  {documentStatus[submit ? "CREATED" : "SUBMITTED"]}
                </div>
                <Button
                  onClick={toPathPreview}
                  radius="medium"
                  className="rounded-2xl bg-gray50 hover:bg-gray200"
                >
                  미리보기
                </Button>

                <nav className="bg-gray50 p-5 rounded-2xl">
                  {Object.entries(link).map(([key, value]) => (
                    <button
                      key={key}
                      className={`transition-all w-full rounded-md box-border pl-[18px] pr-[18px] px-[18px] h-[60px] text-body5 flex items-center justify-between gap-x-[15px] shrink-0 hover:bg-gray100  ${
                        route.includes(key) ? "bg-gray100" : ""
                      }`}
                      onClick={() => toOtherProfileWrite(key)}
                    >
                      {value}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
