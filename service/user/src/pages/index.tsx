import { Inter } from "next/font/google";
import { Header } from "@/components/header";
import { useQueries, useQuery } from "@tanstack/react-query";
import { documentMy } from "@/apis/document/get/my";
import { MyPage } from "@/components/MyPage";
import { myFeedback } from "@/apis/feedback/my";
import { Footer } from "../../../../packages/ui";
import { tmpDocument } from "@/apis/document/get/tmpDocument";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: profile } = useQuery(["mainProfile"], documentMy);
  const { data: feedbacks } = useQuery(["myFeedbackList"], myFeedback);
  const { data: tmpDocuments } = useQuery(["tmpDocumnet"], tmpDocument);

  return (
    <main>
      <Header profileImg={profile?.data.profile_image_url.slice(58)} />
      <div className="absolute w-full h-[360px] bg-gray900" />
      {profile && feedbacks && (
        <MyPage profile={profile.data} feedbacks={feedbacks.data} tmpDocument={tmpDocuments!.data}/>
      )}
      <Footer />
    </main>
  );
}
