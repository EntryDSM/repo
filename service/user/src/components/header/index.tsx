import { WhiteLogo } from "@packages/ui";
import Link from "next/link";
import dummy from "@packages/ui/assets/dummy.png";
import Image from "next/image";
import { useRouter } from "next/router";

const links = {
  마이페이지: "/",
  이력서: "/resume/my",
};

export const Header = () => {
  const { route } = useRouter();
  return (
    <header className="flex justify-center items-center bg-gray900 h-20">
      <div className="w-[1200px] flex justify-between">
        <nav>
          <ul className="flex gap-16 items-center">
            <li>
              <Link href={"/"}>
                <WhiteLogo size={18} />
              </Link>
            </li>
            {Object.entries(links).map(([key, value]) => (
              <li>
                <Link
                  className={`text-body5 ${
                    route === value ||
                    (value.includes("resume") && route.includes("resume"))
                      ? "text-gray50"
                      : "text-gray300"
                  }`}
                  href={"/" + value}
                >
                  {key}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <Image width={40} height={40} src={dummy} alt="프로필 이미지" />
        </div>
      </div>
    </header>
  );
};
