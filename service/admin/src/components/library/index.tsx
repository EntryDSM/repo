import { Library } from "@/apis/library";
import { accessRight } from "@/apis/library/access";
import { Dropdown } from "@packages/ui";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const krStatus = {
  공개: "PUBLIC",
  학생만: "STUDENT_ONLY",
  비공개: "PRIVATE",
} as const;

const enStatus = {
  PUBLIC: "공개",
  STUDENT_ONLY: "학생만",
  PRIVATE: "비공개",
} as const;

export const LibraryCard = ({
  id,
  access_right,
  year,
  grade,
  generation,
  document_url,
}: Library) => {
  const [status, setStatus] = useState<keyof typeof krStatus>(
    enStatus[access_right]
  );

  const { mutate } = useMutation(
    ["asgagahdasgarw"],
    (body: keyof typeof enStatus) => accessRight(id, body)
  );

  const clipUrl = `https://www.dsm-repo.com/public/${id}`;

  return (
    <Link href={`/library/${id}`} className="w-full">
      <article className="flex w-full h-fit items-center bg-gray50 rounded-lg pr-[80px]">
        <hr
          className={`transition-all ${
            status === "공개"
              ? "bg-blue"
              : status === "학생만"
              ? "bg-check"
              : "bg-gray300"
          } h-20 sm:h-40 block border-none rounded-tl-lg rounded-bl-lg min-w-[10px] sm:min-w-[4px]`}
        />
        <div className="flex sm:pl-6 sm:gap-4 text-left w-full sm:flex-col h-20 sm:h-40 sm:py-[12px] md:items-center lg:items-center sm:justify-center whitespace-nowrap">
          <p className="text-body4 sm:text-body5 ml-9 sm:ml-0 w-full">
            {year} {grade}학년 {generation}기
          </p>
          <Dropdown
            placeholder="공개"
            lists={["공개", "학생만", "비공개"]}
            kind="contained"
            className="w-[150px] sm:w-full"
            value={status}
            onClick={({ keyword }) => {
              setStatus(keyword);
              mutate(krStatus[keyword]);
            }}
          />
          {document_url && status == "공개" ? (
            <div
              className="text-body4 sm:text-body5 ml-[80px] sm:ml-0 text-gray300"
              onClick={(e) => {
                e.preventDefault();
                navigator.clipboard.writeText(clipUrl).then(() =>
                  toast("복사되었습니다.", {
                    type: "success",
                    autoClose: 500,
                  })
                );
              }}
            >
              링크 복사
            </div>
          ) : (
            <div className="min-w-[154.17px] h-[12px]"></div>
          )}
        </div>
      </article>
    </Link>
  );
};
