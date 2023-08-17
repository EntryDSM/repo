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
    <main className=" bg-gray100 flex flex-col">
      <header
        className={`fixed top-0 bg-gray50 z-10 h-20 flex items-center justify-center w-full`}
      >
        <div className="flex w-full justify-between items-center px-4 max-w-[900px]">
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
      <section className="relative h-[100vh] flex justify-between px-[200px] pt-[280px] z-[5]">
        <div className="flex flex-col gap-3">
          <div className=" text-[64px] font-bold">Repo</div>
          <div className="text-title4">이력서 온라인 작성 서비스</div>
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
      <section className="px-[200px] flex justify-between items-center h-[100vh]  mt-[200px] bg-gray50">
        <div className="flex flex-col gap-5">
          <div className="text-[64px] font-semibold">간편한</div>
          <div className="text-[40px] font-semibold text-gray400">
            정보 입력
          </div>
          <div className="text-body4 mt-5">
            <div>간편하게 정보들을 입력하고,</div>
            <div>멋진 이력서를 생성해 보세요</div>
          </div>
        </div>
        <Image src={simple} width={500} height={450} alt="simple" />
      </section>
      <section className="px-[200px] flex justify-between items-center h-[100vh] bg-gray50">
        <Image src={feedback} width={600} height={450} alt="fastFeedback" />
        <div className="flex flex-col gap-1">
          <div className="text-[64px] font-semibold">빠른</div>
          <div className="text-[40px] font-semibold text-gray400">
            피드백 확인
          </div>
          <div className="text-body4 mt-5">
            <div className=" whitespace-nowrap">
              선생님이 피드백 해주신 내용을 바탕으로
            </div>
            <div>레주메를 수정해 보세요</div>
          </div>
        </div>
      </section>
      <section className="flex justify-center items-center h-[100vh]">
        <Image
          src={myResume}
          alt="myResume"
          className="w-full h-full absolute object-cover"
        />
        <div className="absolute w-full h-full bg-gray900 opacity-60" />
        <div className="relative z-10 text-gray50 flex flex-col items-center gap-5">
          <div className=" text-[64px] font-bold">깔끔한</div>
          <div className="text-[40px]">나만의 레주메</div>
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
