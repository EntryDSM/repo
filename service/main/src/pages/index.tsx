import Image from "next/image";
import { Inter } from "next/font/google";
import { LoginBranchModal } from "@/components/login-branch-modal";
import { useInversion } from "@packages/hooks";
import { BlackRepoIcon } from "../../../../packages/ui/assets";
import { Button, Footer } from "../../../../packages/ui";
import iMac from "../assets/iMac.png";
import macBook from "../assets/macBook.png";
import simple from "../assets/simple.gif";
import feedback from "../assets/feedback.gif";
import myResume from "../assets/myResume.png";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const {
    state: modal,
    correct: openModal,
    inCorrect: closeModal,
  } = useInversion();

  return (
    <main className=" bg-gray100 flex flex-col items-center w-full">
      <header
        className={`fixed top-0 bg-gray50 z-10 h-20 flex items-center justify-center w-full`}
      >
        <div className="flex w-full justify-between items-center px-[40px] max-w-[1320px]">
          <div className="flex text-[20px] font-semibold gap-1">
            <BlackRepoIcon />
            Repo
          </div>
          <nav>
            <ul className="flex gap-5">
              <Button onClick={openModal}>로그인</Button>
            </ul>
          </nav>
        </div>
      </header>
      <div className="absolute w-full h-[680px] bg-gray50 top-0 z-[0]" />
      <section className="relative h-[100vh] flex justify-between px-[40px] pt-[280px] z-[5] sm:w-full md:w-full lg:w-[1320px]">
        <div className="flex flex-col gap-3">
          <p className=" text-[64px] font-bold">Repo</p>
          <p className="text-title4">이력서 온라인 작성 서비스</p>
          <Button kind="outline" onClick={openModal} className="mt-5 w-fit">
            Repo 시작하기
          </Button>
        </div>
        <div property="relative">
          <Image src={iMac} width={540} height={445} alt="메인 아이맥" />
          <Image
            src={macBook}
            width={585}
            height={435}
            alt="메인 아이맥"
            className="relative top-[-335px]"
          />
        </div>
      </section>
      <div className="w-full bg-gray50 h-fit mt-[200px] flex flex-col items-center">
        <section className="px-[40px] flex sm:flex-col-reverse sm:justify-center md:justify-between lg:justify-between items-center h-[100vh] sm:w-full md:w-full lg:w-[1320px]">
          <div className="flex flex-col gap-5 sm:w-full">
            <p className="text-[64px] font-semibold">간편한</p>
            <p className="text-[40px] font-semibold text-gray400">정보 입력</p>
            <div className="mt-5">
              <p className="text-body4">간편하게 정보들을 입력하고,</p>
              <p className="text-body4">멋진 이력서를 생성해 보세요</p>
            </div>
          </div>
          <Image
            src={simple}
            height={450}
            alt="simple"
            className="object-cover max-w-[600px] max-h-[450px] sm:w-full"
          />
        </section>
        <section className="flex sm:flex-col md:justify-between lg:justify-between items-center px-[40px] h-[100vh] sm:w-full md:w-full lg:w-[1320px]">
          <Image src={feedback} width={600} height={450} alt="fastFeedback" className="transition-all md:w-[520px]" />
          <div className="flex flex-col gap-1 sm:w-full">
            <p className="text-[64px] font-semibold">빠른</p>
            <p className="text-[40px] font-semibold text-gray400">
              피드백 확인
            </p>
            <div className="mt-5">
              <p className="text-body4 whitespace-nowrap">
                선생님이 피드백 해주신 내용을 바탕으로
              </p>
              <p className="text-body4">레주메를 수정해 보세요</p>
            </div>
          </div>
        </section>
      </div>
      <section className="relative flex justify-center w-full items-center h-[100vh]">
        <Image
          src={myResume}
          alt="myResume"
          className="top-0 w-full h-full relative object-cover"
        />
        <div className="absolute w-full h-full bg-gray900 opacity-60" />
        <div className="absolute z-10 text-gray50 flex flex-col items-center gap-5">
          <p className=" text-[64px] font-bold">깔끔한</p>
          <p className="text-[40px]">나만의 레주메</p>
          <Button
            onClick={openModal}
            kind="outlineWhite"
            className=" w-fit mt-5"
          >
            Repo 시작하기
          </Button>
        </div>
      </section>
      <Footer black />
      {modal && <LoginBranchModal closeModal={closeModal} />}
    </main>
  );
}
