import { WhiteLogo } from "@packages/ui";
import dummy from "@packages/ui/assets/dummy.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export const Header = () => {
  const { route } = useRouter();
  return (
    <header className="fixed px-[40px] sm:px-[20px] z-[100] left-0 w-full top-0 flex justify-center items-center bg-gray900 h-20">
      <div className="w-[1400px] flex justify-between items-center">
        <nav>
          <ul className="flex gap-16 sm:gap-[24px] items-center">
            <li className="h-[40px] pt-[6px]">
              <Link href={"/"}>
                <WhiteLogo />
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  route.includes("library") ? "text-gray50" : "text-gray300"
                } text-body5`}
                href={"/library"}
              >
                도서관
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  route.includes("technology") ? "text-gray50" : "text-gray300"
                } text-body5`}
                href={"/technology"}
              >
                전공관리
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <Image width={40} height={40} src={dummy} alt="프로필 이미지" className="sm:w-[32px] sm:h-[32px]" />
        </div>
      </div>
    </header>
  );
};
