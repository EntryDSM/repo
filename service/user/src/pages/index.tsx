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
      <Image src={dummy} alt="profile" />
      <p>장지성</p>
      <p>FrontEnd</p>
      <p>1학년 3반 16번</p>
      <p>jjangji1316@gmail.com</p>
      <div>
        안녕하세요 :) Frontend Developer 장지성입니다. 👋🏻
        <br /> 좋은 코드를 만들어나가는 뿌듯함으로 하루하루 나아가고 있습니다.
      </div>
      <div>
        문제파악부터 설계, 평가까지 복잡한 프로세스를 거쳐 만든 프로그램이 좋은
        평가를 받을 때, 그 어떤 일보다 큰 성취감을 느낍니다. 읽기 쉬운 코드,
        모듈화가 쉬운 코드를 지향하며 꾸준히 성장하는 개발자가 되고싶습니다.
      </div>
      <Footer />
    </main>
  );
}
