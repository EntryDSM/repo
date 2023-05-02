import { Inter } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { useQueries, useQuery } from "react-query";
import { documentMy } from "@/apis/document/get/my";
import { MyPage } from "@/components/MyPage";
import { myFeedback } from "@/apis/feedback/my";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: profile } = useQuery(["mainProfile"], documentMy);
  const { data: feedbacks } = useQuery(["myFeedbackList"], myFeedback);

  return (
    <main>
      <Header />
      <div className="absolute w-full h-[360px] bg-gray900" />
      {profile && feedbacks && (
        <MyPage profile={profile.data} feedbacks={feedbacks.data} />
      )}
      <Footer />
    </main>
  );
}
