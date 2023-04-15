import Image from "next/image";
import { Inter } from "next/font/google";
import { Student } from "@/components/student";
import { Header } from "@/components/header";
import { Dropdown } from "@packages/ui";
import { useQuery } from "react-query";
import { getDocument } from "@/apis/document";

export default function Home() {
  const { data } = useQuery(["dwqdq"], getDocument);
  console.log(data);
  return (
    <>
      <Header />
      <div className="m-auto w-[1120px]">
        <p className="text-title1 mt-28">학생 관리</p>
        <p className="text-title4 mb-20">학생을 관리해보세요</p>
        <div className="mb-10 flex gap-5">
          <Dropdown className="w-40" placeholder="학년" lists={["학년"]} />
          <Dropdown className="w-40" placeholder="반" lists={["년도"]} />
          <Dropdown className="w-40" placeholder="문서상태" lists={["년도"]} />
        </div>
        <Student />
      </div>
    </>
  );
}
