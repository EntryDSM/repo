import React, { useEffect, useRef, useState } from "react";
import { Award } from "@packages/ui/components/PreviewResume/Award";
import { Certificate } from "@packages/ui/components/PreviewResume/Certificate";
import { Project } from "@packages/ui/components/PreviewResume/Project";
import { Activity } from "@packages/ui/components/PreviewResume/Activity";
import { Tag } from "@packages/ui/components/PreviewResume/Tag";
import QRCode from "qrcode.react";
import { PreviewType } from "@packages/ui/components/PreviewResume/PreviewType";
import OutsideClickHandler from "react-outside-click-handler";
import { Button } from "../../../../packages/ui";
import { convert2Pdf } from "@/utils/convert2Pdf";

const subject = {
  1: "소프트웨어개발과",
  2: "소프트웨어개발과",
  3: "임베디드소프트웨어과",
  4: "정보보안과",
};

export const PdfPreviewer = ({
  writer,
  introduce,
  skill_list,
  project_list,
  award_list,
  certificate_list,
  activity_list,
  targetRef,
  pdfView,
}: PreviewType) => {
  const [grade, classNum] = writer.student_number.toString().split("");
  const [page, setPage] = useState<number>(1);

  const activity = useRef<HTMLElement>(null);
  const one = useRef<HTMLDivElement>(null);
  const oneH = one.current?.scrollHeight;

  useEffect(() => {
    if (oneH && oneH > 1164) {
      setPage(2);
    }
  }, [oneH]);

  const closePreview = () => {
    pdfView && pdfView(false);
  };

  const ActivityList = (
    <>
      {activity_list.length > 0 && (
        <article className="flex gap-[10px] flex-col" ref={activity}>
          <h3 className="text-body5">활동</h3>
          {activity_list.map((data, index) => (
            <Activity {...data} key={index} />
          ))}
        </article>
      )}
    </>
  );

  return (
    <div className="z-100 top-0 right-0 absolute w-[calc(100%-320px)] h-full bg-[rgba(0,0,0,0.5)] flex items-center justify-center">
      <OutsideClickHandler onOutsideClick={closePreview}>
        <div className="bg-gray50 h-[900px] w-[829px] rounded-[16px] flex flex-col overflow-hidden">
          <div className="w-full px-[24px] pt-[24px] pb-[16px]">
            <p className="text-body5">PDF로 내보내기</p>
          </div>
          <div className="bg-gray50 h-full overflow-scroll">
            <main
              className={`w-[829px] flex flex-col items-center w-fit bg-gray100`}
              ref={targetRef}
            >
              <div className="w-[829px] h-[1164px] flex justify-center items-center">
                <div
                  className="h-full w-full flex flex-col gap-[20px] scale-[0.9]"
                  ref={one}
                >
                  <article>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-title1 mb-[10px]">{writer.name}</p>
                        <p className="text-title4">{writer.major.name}</p>
                      </div>
                      <div className="flex">
                        <div className="flex flex-col mr-6 text-end gap-[10px] justify-center">
                          <p className="text-body7 leading-[17px]">
                            {writer.student_number}
                          </p>
                          <p className="text-body7 leading-[17px]">
                            {grade !== "1"
                              ? subject[classNum as "1"]
                              : "공통과정"}
                          </p>
                          <p className="text-body7 leading-[17px]">
                            {writer.email}
                          </p>
                        </div>
                        {writer.url && (
                          <div>
                            <QRCode size={80} value={writer.url} />
                          </div>
                        )}
                      </div>
                    </div>
                  </article>

                  <article>
                    <div>
                      <h3 className="text-body3">{introduce.heading}</h3>
                      <pre className="text-body7 whitespace-pre-wrap text-gray400 mt-[20px] leading-[17px]">
                        {introduce.introduce}
                      </pre>
                    </div>
                  </article>

                  {!!skill_list.length && (
                    <article className="flex flex-col gap-[10px]">
                      <h3 className="text-body5">기술 스택</h3>
                      <pre className="flex gap-3 flex-wrap">
                        {skill_list.map((skill, index) => (
                          <Tag
                            key={index}
                            className="bg-gray50"
                            technology={skill}
                          />
                        ))}
                      </pre>
                    </article>
                  )}

                  {award_list.length > 0 && (
                    <article className="flex gap-[10px] flex-col">
                      <h3 className="text-body5">수상 경력</h3>
                      {award_list.map((award, index) => (
                        <Award {...award} key={index} />
                      ))}
                    </article>
                  )}

                  {certificate_list.length > 0 && (
                    <article className="flex gap-[10px] flex-col">
                      <h3 className="text-body5">자격증</h3>
                      {certificate_list.map((data, index) => (
                        <Certificate {...data} key={index} />
                      ))}
                    </article>
                  )}
                  {page === 1 && ActivityList}
                </div>
              </div>

              {page > 1 && (
                <div className="h-[1164px] w-[829px] flex justify-center items-center">
                  <div className="h-[1164px] w-[829px] flex scale-[0.9]">
                    <div
                      className="h-fit w-full flex flex-col gap-[20px]"
                      id="two"
                    >
                      {page === 2 && ActivityList}
                    </div>
                  </div>
                </div>
              )}

              <article className="flex flex-col">
                {project_list.map((data, index) => (
                  <div
                    className="w-[829px] h-[1164px] flex flex-col justify-center items-center"
                    key={index}
                  >
                    <div className="h-full w-full flex flex-col gap-[20px] scale-[0.9]">
                      {index === 0 && (
                        <h3 className="text-[22px] font-semibold leading-[26px] w-full">
                          Project
                        </h3>
                      )}
                      <div className={`h-full w-full`}>
                        <Project {...data} />
                      </div>
                    </div>
                  </div>
                ))}
              </article>
            </main>
          </div>
          <div className="flex justify-end px-[24px] py-[12px]">
            <Button
              onClick={() =>
                targetRef &&
                convert2Pdf(targetRef, `대마고 ${writer.name} 이력서`)
              }
              kind="outline"
              className="w-full"
            >
              PDF로 내보내기
            </Button>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};
