import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <button className="flex justify-content item-center">로그인하기</button>
    </main>
  );
}
