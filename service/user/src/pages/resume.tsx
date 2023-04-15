import { HeaderBack } from "@/components/HeaderBack";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Button, TextArea } from "@packages/ui";
import { Plus } from "../../../../packages/ui/assets";
import Link from "next/link";

const Resume = () => {
  return (
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
            <div className="bg-gray50 w-[782px] pt-10 pb-10 pl-14 pr-14">
              <p className="text-title2">자기소개</p>
              <div className="flex gap-20">
                <div className="text-body3 w-44">
                  <span>한 줄 소개</span>
                  <span className="text-red ml-1">*</span>
                </div>
                <TextArea name="" value="" placeholder="" onChange={() => {}} />
              </div>
              <TextArea name="" value="" placeholder="" onChange={() => {}} />
            </div>

            <div className="w-72 flex gap-4 flex-col">
              <div className="bg-gray50 text-title1 text-gray300 pl-9 pt-16 pb-16 rounded-2xl">
                미제출
              </div>
              <div className="bg-gray50 text-body5 rounded-2xl h-11 flex items-center justify-center">
                미리보기
              </div>

              <nav className="bg-gray50 p-5 rounded-2xl">
                <Link href={"/"}>
                  <div className="flex justify-center items-center h-14 text-body5">
                    내 정보
                  </div>
                </Link>
                <Link href={"/"}>
                  <div className="flex justify-center items-center h-14 text-body5">
                    자기소개
                  </div>
                </Link>
                <Link href={"/"}>
                  <div className="flex justify-center items-center h-14 text-body5">
                    프로젝트
                  </div>
                </Link>
                <Link href={"/"}>
                  <div className="flex justify-center items-center h-14 text-body5">
                    수상
                  </div>
                </Link>
                <Link href={"/"}>
                  <div className="flex justify-center items-center h-14 text-body5">
                    자격증
                  </div>
                </Link>
              </nav>
            </div>
          </div>
        </div>
        <Footer />
      </HeaderBack>
    </div>
  );
};

export default Resume;
