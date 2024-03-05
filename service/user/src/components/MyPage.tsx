import { DocumentMyRes } from "@/apis/document/get/my";
import { MyFeedbackResType } from "@/apis/feedback/my";
import { Button } from "@packages/ui";
import { Close } from "@packages/ui/assets";
import { useInversion } from "@packages/hooks";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useState } from "react";
import ReactOutSideClickHandler from "react-outside-click-handler";

const statusList = ["작성", "제출됨", "공유됨"];
const statusIdx = {
  CREATED: 0,
  SUBMITTED: 1,
  SHARED: 2,
};

export interface TmpDocument {
  writer?: string | null;
  introduce?: string | null;
  skill_set?: string | null;
  project_list?: string | null;
  award_list?: string | null;
  certificate_list?: string | null;
  activity_list?: string | null;
}

interface PropsType {
  profile: DocumentMyRes;
  feedbacks: MyFeedbackResType;
  tmpDocument: TmpDocument
}

export const MyPage = ({ profile, feedbacks, tmpDocument }: PropsType) => {
  const {
    profile_image_url,
    name,
    major_name,
    grade,
    class_num,
    number,
    email,
    is_exist,
    status,
    heading,
    introduce,
  } = profile;
  const { feedback_list } = feedbacks;
  const {
    writer,
    skill_set,
    project_list,
    award_list,
    certificate_list,
    activity_list
  } = tmpDocument;

  const {
    state: modal,
    correct: openModal,
    inCorrect: closeModal,
  } = useInversion();

  const {
    state: toggle,
    correct: open,
    inCorrect: close,
  } = useInversion();

  return (
    <>
    <div className="max-w-[1200px] px-[40px] sm:px-[20px] w-full m-auto my-[200px] sm:mt-[164px]">
      <div className="transition-all relative bg-gray50 w-full rounded-[15px] px-40 md:px-[80px] sm:px-[48px] pt-[170px] sm:pt-[120px] pb-[80px] sm:pb-[80px] mb-[120px]">
        <div className="transition-all absolute -top-20 sm:-top-16 -ml-20 md:-ml-12 sm:-ml-8 flex gap-x-[30px]">
          <div className="flex flex-col items-center gap-y-5">
            <Image
              width={160}
              height={160}
              src={profile_image_url}
              alt="profile"
              priority
              className="rounded-full w-40 h-40 object-cover sm:w-[100px] sm:h-[100px]"
            />
            <div className="w-[2px] h-8 sm:h-8 bg-gray200 rounded" />
          </div>
          <div className="mt-[4px]">
            <p className="text-title1 sm:text-title3 text-gray50 h-[36px] mb-[6px] sm:-mb-2">{name}</p>
            <p className="text-gray300 text-body4 sm:text-body5 mb-[56px] sm:mb-[32px] h-[24px]">
              {major_name || "전공을 선택해 주세요"}
            </p>
            <p className="text-body5 sm:text-body8 mb-[23px] sm:mb-[12px]">
              {grade}학년 {class_num}반 {number}번
            </p>
            <p className="text-body5 sm:text-body8">
              {email || "이메일이 등록되지 않았습니다"}
            </p>
          </div>
        </div>
        {is_exist ? (
          <>
            <p className="text-body3 sm:text-body5 mb-[44px] sm:mb-[28px] whitespace-pre-wrap">
              {heading}
            </p>
            <p className="text-body6 sm:text-body7 text-gray400 whitespace-pre-wrap">
              {introduce === "" ? "문서를 작성해주세요" : introduce}
            </p>
          </>
        ) : (
          <p className="text-body6 text-gray400">문서를 작성해주세요</p>
        )}


      </div>

      <p className="text-title1 mb-2.5">레주메</p>
      <p className="text-title4 mb-[47px]">Resumé</p>
      <div className="w-full h-[190px] bg-gray50 rounded-2xl pt-[60px] flex justify-center">
        <div className="flex">
          {statusList.map((statusItem, idx) => {
            const progress = statusIdx[status || "CREATED"];
            return (
              <Ball
                key={statusItem}
                complete={idx <= progress}
                isFirstLine={idx === 0}
              >
                <div>{statusItem}</div>
              </Ball>
            );
          })}
          <Line width={80} />
        </div>
      </div>

      <div className="bg-gray50 rounded-2xl pl-12 pr-12 text-body3 mt-5 pt-14 pb-14 flex flex-col gap-10">
        {!!feedback_list.length ? (
          <>
            <div>
              <span>피드백</span>
              <span className="text-gray300 ml-2">{feedback_list.length}</span>
            </div>
            {feedback_list.map(({ element_name, comment }) => (
              <div
                key={element_name}
                className="bg-gray100 rounded-2xl pl-10 pr-10 pt-12 pb-12 flex flex-col gap-[30px]"
              >
                <p>{element_name}</p>
                <p className="text-body6 whitespace-pre-wrap">{comment}</p>
              </div>
            ))}
          </>
        ) : (
          <p className="w-full h-40 bg-gray100 rounded-2xl flex justify-center items-center whitespace-pre-wrap text-center text-body5">
            {"이력서를 작성하고, 제출하여\n 피드백을 받아보세요"}
          </p>
        )}
        <div className="flex justify-end gap-x-5 [&>button]:w-fit">
          <Link href="/preview">
            <Button kind="contained" radius="circle">
              미리보기
            </Button>
          </Link>
          <Link href="/resume/my">
            <Button kind="contained" radius="circle">
              내 이력서 관리하기
            </Button>
          </Link>
        </div>
      </div>
    </div>
    { modal && <div
      className="fixed top-0 right-0 left-0 h-[100vh] flex items-center justify-center z-20"
      style={{ background: "rgba(0, 0, 0, 0.7)" }}
    >
      <ReactOutSideClickHandler onOutsideClick={closeModal}>
        <div className="w-[750px] h-[670px] relative rounded-lg bg-gray100 flex flex-col items-center justify-center gap-y-10 px-20 py-10">
          <div>
            {toggle ? <>
              <p className="w-[600px]">
                안녕하세요? REPO 담당자입니다.<br/>
                어제 밤 18시경에 DB 볼륨이 손실되는 사고가 발생했습니다.<br/><br/>
                손실 직전 이력서 백업본이 남아있지만,<br/>
                데이터 형식이 맞지 않아 완전한 형태로 복구하기 위해선 긴 작업이 필요합니다.<br/><br/>
                작성 일정이 제한되어있는 상황이기에 데이터 완전 복구 대신<br/>
                텍스트로 되어있는 데이터를 임시로 공개하려고 합니다.<br/><br/>
                죄송합니다.<br/>
                다음에는 이러한 일이 발생하지 않도록 DB 백업 절차를 강화하겠습니다.<br/><br/>
                여러분들은 mongoDB 백업 꼭 JSON으로 하세요.<br/>
                너른 양해 부탁드립니다. 감사합니다.<br/><br/>
              </p>
              <p onClick={close}>닫기</p>
            </> : <>
              <p className="w-[600px]" onClick={open}>공지 열기</p>
            </>
            }
          </div>
          <div className="bg-[#eeeeee] overflow-y-scroll h-full w-full rounded-md whitespace-pre-wrap">
            {writer}
            {tmpDocument.introduce}
            {skill_set}
            {project_list}
            {award_list}
            {certificate_list}
            {activity_list}
          </div>
          <div
            onClick={closeModal}
            className="absolute top-[30px] right-[30px] cursor-pointer"
          >
            <Close size={24} />
          </div>
        </div>
      </ReactOutSideClickHandler>
    </div>}
    </>
  );
};

interface BallType {
  children: ReactNode;
  complete?: boolean;
  isFirstLine?: boolean;
}

interface LineType {
  width: number;
  complete?: boolean;
}

const Line = ({ complete, width }: LineType) => (
  <div
    className={`${complete ? "h-[3px]" : "h-[2px]"} mt-5 ${
      complete ? "bg-gray900" : "bg-gray300"
    }`}
    style={{ width: width }}
  ></div>
);

const Ball = ({ complete, children, isFirstLine }: BallType) => (
  <>
    <Line complete={complete} width={isFirstLine ? 80 : 340} />
    <div className="flex flex-col items-center gap-y-[15px]">
      <div
        className={`w-[30px] h-[30px] m-[5px] rounded-[100px] ${
          complete ? "bg-gray900" : "bg-gray300"
        }`}
      />
      {children}
    </div>
  </>
);
