import Image from "next/image";
import { Inter } from "next/font/google";
import { Student } from "@/components/student";

export default function Home() {
  return (
    <div>
      <p>학생 관리</p>
      <p>학생을 관리해보세요</p>
      <Student />
    </div>
  );
}
