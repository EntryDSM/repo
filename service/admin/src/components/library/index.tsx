import Link from "next/link";
import { Dropdown } from "@packages/ui";
import { Library } from "@/apis/library";
import { useState } from "react";
import { useMutation } from "react-query";
import { accessRight } from "@/apis/library/access";
import { toast } from "react-toastify";

export const LibraryCard = ({
  id,
  access_right,
  year,
  grade,
  generation,
  url,
}: Library) => {
  const [status, setStatus] = useState<typeof access_right>(access_right);

  const { mutate } = useMutation("asgagahdasgarw", () =>
    accessRight(id, access_right)
  );

  return (
    <Link href={`/library/${id}`}>
      <article className="flex w-[1120px] h-20 items-center bg-gray50 rounded-lg">
        <hr className="h-full block bg-gray300 border-none rounded-tl-lg rounded-bl-lg w-2" />
        <div className="text-body4 ml-9 w-[655px]">
          {year} {grade}학년 {generation}기
        </div>
        <Dropdown
          placeholder="공개"
          lists={["PUBLIC", "STUDENT_ONLY", "PRIVATE"]}
          kind="contained"
          className="w-[150px]"
          value={status}
          onClick={({ keyword }) => {
            setStatus(keyword);
            mutate();
          }}
        />
        <div
          className="text-body4 ml-20 text-gray300"
          onClick={(e) => {
            e.preventDefault();
            navigator.clipboard
              .writeText(url)
              .then(() =>
                toast("복사됬습니다.", { type: "success", autoClose: 500 })
              );
          }}
        >
          링크 복사
        </div>
      </article>
    </Link>
  );
};
