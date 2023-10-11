import React, { useLayoutEffect, useRef, useState } from "react";
import { Award } from "./Award";
import { Certificate } from "./Certificate";
import { Project } from "./Project";
import { Activity } from "./Activity";
import { Tag } from "./Tag";
import QRCode from "qrcode.react";
import { Arrow } from "../../assets";
import { PreviewType, FeedbackBoxType } from "./PreviewType";

const subject = {
  1: "소프트웨어개발과",
  2: "소프트웨어개발과",
  3: "임베디드소프트웨어과",
  4: "정보보안과",
};

export const PreviewResume = ({
  document_id,
  writer,
  introduce,
  skill_list,
  project_list,
  award_list,
  certificate_list,
  activity_list,
  FeedbackBox,
}: PreviewType) => {
  const FeedBack = (props: Omit<FeedbackBoxType, "document_id">): JSX.Element =>
    FeedbackBox ? (
      <FeedbackBox document_id={document_id} {...props} />
    ) : (
      <>{props.children}</>
    );
  const feedbackWidth = FeedbackBox ? "w-[848px] ml-[48px]" : "w-[800px]";

  const [grade, classNum] = writer.student_number.toString().split("");

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const activity = useRef<HTMLElement>(null);
  const one = useRef<HTMLDivElement>(null);

  const heightCheck = () => {
    if (one.current && one.current?.scrollHeight > 1164) {
      setPage(2);
    } else {
      setPage(1);
    }
  };

  useLayoutEffect(() => {
    setTimeout(() => {
      heightCheck();
    }, 1);
    return () => {
      setCurrentPage(0);
      setPage(1);
    };
  }, [document_id]);

  const back = () => {
    setCurrentPage((p) => (p > 1 ? p - 2 : p));
  };

  const front = () => {
    setCurrentPage((p) => (p < project_list.length + page - 2 ? p + 2 : p));
  };

  window.onkeydown = (e) => {
    if (e.key === "ArrowRight") {
      front();
    } else if (e.key === "ArrowLeft") {
      back();
    }
  };

  const ActivityList = (
    <>
      {activity_list.length > 0 && (
        <article className="flex gap-[10px] flex-col" ref={activity}>
          <h3 className="text-body5">활동</h3>
          {activity_list.map((data, index) => (
            <FeedBack
              key={index}
              part={data.name}
              element_id={data.element_id}
              comment={data.feedback}
            >
              <Activity {...data} />
            </FeedBack>
          ))}
        </article>
      )}
    </>
  );

  interface PageProps {
    content: React.ReactNode;
  }

  const Page: React.FC<PageProps> = ({ content }) => {
    return (
      <div className="w-[650px]">
        <div className="h-[100vh] w-[800px] flex justify-center items-center">
          <div className="h-[1123px] w-[794px] p-3 flex scale-[0.68]">
            {content}
          </div>
        </div>
      </div>
    );
  };

  return (
    <main
      className={`${feedbackWidth} flex w-full ml-[10px] h-fit overflow-hidden`}
    >
      {!currentPage && (
        <Page
          content={
            <div className="h-fit flex flex-col gap-[20px]" ref={one}>
              <article className="w-full">
                <FeedBack
                  part="기본정보"
                  element_id={writer.element_id}
                  comment={writer.feedback}
                >
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
                </FeedBack>
              </article>

              <article>
                <FeedBack
                  part="자기소개"
                  element_id={introduce.element_id}
                  comment={introduce.feedback}
                >
                  <div>
                    <h3 className="text-body3">{introduce.heading}</h3>
                    <pre className="text-body7 whitespace-pre-wrap text-gray400 mt-[20px] leading-[17px]">
                      {introduce.introduce}
                    </pre>
                  </div>
                </FeedBack>
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
                    <FeedBack
                      key={index}
                      part={award.name}
                      element_id={award.element_id}
                      comment={award.feedback}
                    >
                      <Award {...award} />
                    </FeedBack>
                  ))}
                </article>
              )}
              {certificate_list.length > 0 && (
                <article className="flex gap-[10px] flex-col">
                  <h3 className="text-body5">자격증</h3>
                  {certificate_list.map((data, index) => (
                    <FeedBack
                      key={index}
                      part={data.name}
                      element_id={data.element_id}
                      comment={data.feedback}
                    >
                      <Certificate {...data} />
                    </FeedBack>
                  ))}
                </article>
              )}
              {page === 1 && ActivityList}
            </div>
          }
        />
      )}

      {!currentPage && page > 1 && (
        <Page
          content={
            <div className="h-fit w-full flex flex-col gap-[20px]" id="two">
              {page === 2 && ActivityList}
            </div>
          }
        />
      )}

      <article className="flex">
        {project_list.map((data, index) => (
          <div
            key={index}
            className={`${
              (!index &&
                ((page === 1 && currentPage === 0) ||
                  (page === 2 && currentPage === 2))) ||
              (index &&
                currentPage >= 2 &&
                ((page === 1 &&
                  (currentPage - page === index || currentPage === index)) ||
                  (page === 2 &&
                    (currentPage - 1 === index ||
                      currentPage - page === index))))
                ? "block"
                : "hidden"
            } h-[100vh] flex`}
          >
            <Page
              content={
                <FeedBack
                  key={index}
                  part={data.name}
                  element_id={data.element_id}
                  comment={data.feedback}
                >
                  <div className="flex flex-col justify-center">
                    <div className="w-full h-full">
                      <Project {...data} />
                    </div>
                  </div>
                </FeedBack>
              }
            />
          </div>
        ))}
        {(page + project_list.length) % 2 !== 0 &&
          currentPage - page + 1 === project_list.length && (
            <div className="h-[1123px] w-[794px] flex justify-center"></div>
          )}
      </article>

      <div className="fixed flex right-32 bottom-14 gap-2">
        <div className="flex bg-gray900 rounded-3xl py-[4px] px-[12px] justify-center gap-[6px] text-gray50 items-center">
          <button onClick={back}>
            <Arrow
              direction="left"
              className={`[&_path]:${
                !currentPage ? "fill-gray400" : "fill-gray50"
              }`}
            />
          </button>
          <p>
            {currentPage + 1}
            {currentPage + 1 != project_list.length + page
              ? " - " + (currentPage + 2)
              : ""}{" "}
            / {project_list.length + page}
          </p>
          <button onClick={front}>
            <Arrow
              className={`[&_path]:${
                currentPage === project_list.length + page - 2 ||
                currentPage === project_list.length + page - 1
                  ? "fill-gray400"
                  : "fill-gray50"
              }`}
            />
          </button>
        </div>
      </div>
    </main>
  );
};
