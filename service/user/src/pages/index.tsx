import Image from "next/image";
import { Inter } from "next/font/google";
import { Footer } from "@/components/footer";
import Input from "@packages/ui/components/Input";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <Input label="asgsa" placeholder="asf" />
      <Footer />
    </main>
  );
}
