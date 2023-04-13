import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";
import { LoginBranchModal } from "@/components/login-branch-modal";
import { useInversion } from "@packages/hooks";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const {
    state: modal,
    correct: openModal,
    inCorrect: closeModal,
  } = useInversion();

  return (
    <main>
      <button onClick={openModal} className="flex justify-content item-center">
        로그인하기
      </button>
      {modal && <LoginBranchModal closeModal={closeModal} />}
    </main>
  );
}
