import Image from "next/image";
import dummy from "@packages/ui/assets/dummy.png";
import Link from "next/link";

export const Student = () => {
  return (
    <Link href={"/qdwqqdw"}>
      <article className="flex w-[1120px] h-20 pl-10 pr-10 items-center bg-gray50 rounded-md">
        <Image width={46} height={46} src={dummy} alt="" />
        <div className="w-28 text-body4 ml-5">좌찬익</div>
        <div className="text-body4 w-96">3218</div>
        <div className="text-body4 w-52">공개</div>
        <div className="text-body4">피드백 1</div>
      </article>
    </Link>
  );
};
