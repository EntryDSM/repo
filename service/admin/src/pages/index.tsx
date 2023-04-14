import Image from "next/image";
import { Inter } from "next/font/google";
import { Student } from "@/components/student";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <>
      <Header />
      <div className="m-auto w-[1120px]">
        <p className="text-title1">학생 관리</p>
        <p className="text-title4">학생을 관리해보세요</p>
        <Student />
      </div>
    </>
  );
}
