import { WhiteLogo } from "@packages/ui";
import Link from "next/link";
import dummy from "@packages/ui/assets/dummy.png";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="flex justify-center items-center bg-gray900 h-20">
      <div className="w-[1400px] flex justify-between">
        <nav>
          <ul className="flex gap-16 items-center">
            <li>
              <Link href={"/"}>
                <WhiteLogo />
              </Link>
            </li>
            <li>
              <Link className="text-gray50" href={"/my-page"}>
                마이페이지
              </Link>
            </li>
            <li>
              <Link className="text-gray50" href={"/resume"}>
                이력서
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <Image width={40} height={40} src={dummy} alt="프로필 이미지" />
        </div>
      </div>
    </header>
  );
};
