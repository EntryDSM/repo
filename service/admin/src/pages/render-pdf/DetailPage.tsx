import { Tag } from "@packages/ui/components/PreviewResume/Tag";
import { Award } from "@packages/ui/components/PreviewResume/Award";
import { Certificate } from "@packages/ui/components/PreviewResume/Certificate";
import { Project } from "@packages/ui/components/PreviewResume/Project";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Activity } from "@packages/ui/components/PreviewResume/Activity";
import QRCode from "qrcode.react";
import { PreviewType } from "@packages/ui/components/PreviewResume/PreviewType";

const subject = {
  1: "소프트웨어개발과",
  2: "소프트웨어개발과",
  3: "임베디드소프트웨어과",
  4: "정보보안과",
};

const DetailPage = ({
  writer,
  introduce,
  skill_list,
  project_list,
  award_list,
  certificate_list,
  activity_list,
}: PreviewType) => {
  const [grade, classNum] = writer.student_number.toString().split("");
  const [page, setPage] = useState<number>(1);
  const [trigger, setTrigger] = useState<boolean>(false);

  const activity = useRef<HTMLElement>(null);
  const one = useRef<HTMLDivElement>(null);

  const heightCheck = () => {
    if (one.current && one.current?.scrollHeight > 1171) {
      setPage(2);
      console.log("page set 2: " + one.current?.scrollHeight);
    } else {
      setPage(1);
    }
  };

  useLayoutEffect(() => {
    setTimeout(() => {
      heightCheck();
    }, 100);
  }, [trigger]);
  useEffect(() => {
    setTimeout(() => {
      setTrigger(true);
    }, 1000);
  }, []);

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
    <>
      <div className="w-[831px] h-[1171px] bg-gray100 flex justify-center items-center">
        <div
          className="h-full w-full flex flex-col gap-[20px] scale-[0.92]"
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
                    {grade !== "1" ? subject[classNum as "1"] : "공통과정"}
                  </p>
                  <p className="text-body7 leading-[17px]">{writer.email}</p>
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
                  <Tag key={index} className="bg-gray50" technology={skill} />
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
        <div className="w-[831px] h-[1171px] flex justify-center items-center bg-gray100">
          <div className="h-full w-full flex scale-[0.92]">
            <div className="h-fit w-full flex flex-col gap-[20px]" id="two">
              {page === 2 && ActivityList}
            </div>
          </div>
        </div>
      )}
      <article className="flex flex-col bg-gray100">
        {project_list.map((data, index) => (
          <div
            className="w-[831px] h-[1171px] bg-gray100 flex flex-col justify-center items-center"
            key={index}
          >
            <div className="w-[831px] h-[1171px] flex flex-col gap-[20px] scale-[0.92]">
              <div className={`h-full w-full`}>
                <Project {...data} />
              </div>
            </div>
          </div>
        ))}
      </article>
    </>
  );
};

export default DetailPage;
