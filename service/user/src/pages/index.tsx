import { Inter } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { useQuery } from "react-query";
import { documentMy } from "@/apis/document/my";
import { MyPage } from "@/components/MyPage";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data } = useQuery(["dwq"], documentMy);

  return (
    <main>
      <Header />
      <div className="absolute w-full h-[360px] bg-gray900" />
      {data && <MyPage {...data.data} />}
      <Footer />
    </main>
  );
}
