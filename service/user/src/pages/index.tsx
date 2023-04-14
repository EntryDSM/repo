import Image from "next/image";
import { Inter } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import dummy from "@packages/ui/assets/dummy.png";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <Header />
      <div className="w-[1120px] m-auto">
        <div className="bg-gray50 rounded-2xl">
          <Image src={dummy} alt="profile" />
          <p className="text-title1">장지성</p>
          <p className="text-gray300 text-body4">FrontEnd</p>
          <p className="text-body5">1학년 3반 16번</p>
          <p className="text-body5">jjangji1316@gmail.com</p>
          <div className="text-body3">
            안녕하세요 :) Frontend Developer 장지성입니다. 👋🏻
            <br /> 좋은 코드를 만들어나가는 뿌듯함으로 하루하루 나아가고
            있습니다.
          </div>
          <div className="text-body6 text-gray400">
            문제파악부터 설계, 평가까지 복잡한 프로세스를 거쳐 만든 프로그램이
            좋은 평가를 받을 때, 그 어떤 일보다 큰 성취감을 느낍니다. 읽기 쉬운
            코드, 모듈화가 쉬운 코드를 지향하며 꾸준히 성장하는 개발자가
            되고싶습니다.
          </div>
        </div>

        <p className="text-title1">레주메</p>
        <p className="text-title4">Resumé</p>
        <div className="bg-gray50 rounded-2xl">
          <div>작성</div>
          <div>제출됨</div>
          <div>공유됨</div>
        </div>

        <div className="bg-gray50 rounded-2xl pl-12 pr-12 text-body3 mt-5 pt-14 pb-14">
          <div>
            <span>피드백</span>
            <span className="text-gray300 ml-2">4</span>
          </div>
          <div className="bg-gray100 rounded-2xl pl-10 pr-10 pt-12 pb-12 mt-10">
            <p>프로젝트 EXIT</p>
            <div className="text-body6">
              프로젝트에서 한 경험이나 그 프로젝트를 통해 배우거나 느낀점을 사례
              중심으로 자세하게 적어주면 좋을 것 같아요. 그냥 ~~했다 라는 식으로
              적고 끝내면 친구가 그 프로젝트를 통해 어떤 것을 얻었는지, 어떻게
              성장하게 되었는지를 알 수 없어서 그 부분을 더 추가해주세요.
            </div>
          </div>

          <div className="bg-gray100 rounded-2xl pl-10 pr-10 pt-12 pb-12 mt-10">
            <p>프로젝트 EXIT</p>
            <div className="text-body6">
              프로젝트에서 한 경험이나 그 프로젝트를 통해 배우거나 느낀점을 사례
              중심으로 자세하게 적어주면 좋을 것 같아요. 그냥 ~~했다 라는 식으로
              적고 끝내면 친구가 그 프로젝트를 통해 어떤 것을 얻었는지, 어떻게
              성장하게 되었는지를 알 수 없어서 그 부분을 더 추가해주세요.
            </div>
          </div>

          <div className="bg-gray100 rounded-2xl pl-10 pr-10 pt-12 pb-12 mt-10">
            <p>프로젝트 EXIT</p>
            <div className="text-body6">
              프로젝트에서 한 경험이나 그 프로젝트를 통해 배우거나 느낀점을 사례
              중심으로 자세하게 적어주면 좋을 것 같아요. 그냥 ~~했다 라는 식으로
              적고 끝내면 친구가 그 프로젝트를 통해 어떤 것을 얻었는지, 어떻게
              성장하게 되었는지를 알 수 없어서 그 부분을 더 추가해주세요.
            </div>
          </div>

          <div className="bg-gray100 rounded-2xl pl-10 pr-10 pt-12 pb-12 mt-10">
            <p>프로젝트 EXIT</p>
            <div className="text-body6">
              프로젝트에서 한 경험이나 그 프로젝트를 통해 배우거나 느낀점을 사례
              중심으로 자세하게 적어주면 좋을 것 같아요. 그냥 ~~했다 라는 식으로
              적고 끝내면 친구가 그 프로젝트를 통해 어떤 것을 얻었는지, 어떻게
              성장하게 되었는지를 알 수 없어서 그 부분을 더 추가해주세요.
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
