import { PreviewResume, SideBar, TextArea } from "@packages/ui";
import Image from "next/image";

const detail = () => {
  return (
    <div>
      <SideBar>
        <PreviewResume
          name="장지성"
          field="Frontend Developer"
          developClass="소프트웨어개발과"
          email="jjangji1316@gmail.com"
          tell="010-5678-1234"
          introduction="안녕하세요 :) 항상 좋은 코드를 만들어나가는 뿌듯함으로
          하루하루 나아가고 있습니다. 👍"
          aboutMe="문제파악부터 설계, 평가까지 복잡한 프로세스를 거쳐 만든 프로그램이 좋은 평가를 받을 때, 그 어떤 일보다 큰 성취감을 느낍니다. 읽기 쉬운 코드, 모듈화가 쉬운 코드를 지향하며 꾸준히 성장하는 개발자가 되고싶습니다.
          높은 퀄리티의 결과물을 내기 위해서 기획과정에서 어쩌구저쩌구하여 목표를 잡았고, intellij의 cokworking 기능을 활용하여 협업 개발 및 배포 전 CI 단계에서의 시간을 절약하며 개발하였습니다. "
          technologyList={["TypeScript", "HTML", "React"]}
          awards=""
          Image={Image}
        />
      </SideBar>
    </div>
  );
};

export default detail;
