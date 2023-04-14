import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Button } from "@packages/ui";

const Resume = () => {
  return (
    <div>
      <Header />
      <p>이력서 관리</p>
      <p>Resumé Management</p>
      <Button kind="outline" radius="normal">
        임시 저장
      </Button>
      <Button kind="contained" radius="normal">
        제출
      </Button>
      <Footer />
    </div>
  );
};

export default Resume;
