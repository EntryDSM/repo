import { WhiteLogo } from "@packages/ui";
import dummy from "@packages/ui/assets/dummy.png";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <header className=" fixed left-0 w-full top-0 flex justify-center items-center bg-gray900 h-20">
      <div className="w-[1400px] flex justify-between">
        <nav>
          <ul className="flex gap-16 items-center">
            <li>
              <Link href={"/"}>
                <WhiteLogo />
              </Link>
            </li>
            <li>
              <Link className="text-gray50" href={"/library"}>
                도서관
              </Link>
            </li>
            <li>
              <Link className="text-gray50" href={"/technology"}>
                전공관리
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
