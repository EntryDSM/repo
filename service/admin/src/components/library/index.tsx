import Link from "next/link";

export const LibraryCard = () => {
  return (
    <Link href={"/"}>
      <article className="flex w-[1120px] h-20 items-center bg-gray50 rounded-lg">
        <hr className="h-full block bg-gray300 border-none rounded-tl-lg rounded-bl-lg w-2" />
        <div className="text-body4 ml-5 w-[655px]">2022 1학년 8기</div>
        <div className="text-body4">링크 복사</div>
      </article>
    </Link>
  );
};
