import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Button } from "@packages/ui";

const Resume = () => {
  return (
    <div>
      <Header />
      <div className="w-[1120px] m-auto">
        <p className="text-title1">이력서 관리</p>
        <p className="text-title4 flex justify-between">
          Resumé Management
          <div>
            <Button width={88} kind="outline" radius="normal">
              임시 저장
            </Button>
            <Button width={61} kind="contained" radius="normal">
              제출
            </Button>
          </div>
        </p>

        <div>

        </div>

        <div>
          
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Resume;
