import Link from "next/link";
import { Dropdown } from "@packages/ui";

export const LibraryCard = () => {
  return (
    <Link href={"/library/wqdw"}>
      <article className="flex w-[1120px] h-20 items-center bg-gray50 rounded-lg">
        <hr className="h-full block bg-gray300 border-none rounded-tl-lg rounded-bl-lg w-2" />
        <div className="text-body4 ml-9 w-[655px]">2022 1학년 8기</div>
        <Dropdown
          placeholder="공개"
          lists={[]}
          kind="contained"
          className="w-[150px]"
        />
        <div className="text-body4 ml-20 text-gray300">링크 복사</div>
      </article>
    </Link>
  );
};
