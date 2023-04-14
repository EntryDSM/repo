import { HeaderBack } from "@/components/HeaderBack";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Button } from "@packages/ui";
import { Plus } from "../../../../packages/ui/assets";

const Resume = () => {
  return (
    <div>
      <Header />
      <HeaderBack>
        <div className="w-[1120px] m-auto">
          <p className="text-title1 text-gray50">이력서 관리</p>
          <p className="text-title4 flex justify-between text-gray50">
            Resumé Management
            <div className="flex gap-x-[15px]">
              <Button width={88} kind="outline" radius="normal">
                임시 저장
              </Button>
              <Button width={61} kind="contained" radius="normal">
                제출
              </Button>
              <Button kind="contained">
                <Plus size={24} />
                agag
              </Button>
            </div>
          </p>

          <div>
            <div className="w-100 px-15 py-10 bg-gray50">fas</div>
          </div>

          <div></div>
        </div>
        <Footer />
      </HeaderBack>
    </div>
  );
};

export default Resume;
