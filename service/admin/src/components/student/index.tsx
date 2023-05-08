import Image from "next/image";
import dummy from "@packages/ui/assets/dummy.png";
import Link from "next/link";
import { StudentType } from "@/apis/student";

export const Student = ({
  student_id,
  document_id,
  name,
  feedback_count,
  student_number,
  profile_image_url,
}: StudentType) => {
  return (
    <Link href={`/${student_id}`}>
      <article className="flex w-[1120px] h-20 pl-10 pr-10 items-center bg-gray50 rounded-md">
        <Image
          width={46}
          height={46}
          src={profile_image_url}
          alt="학생관리 프로필 이미지"
          className=" rounded-full"
        />
        <div className="w-28 text-body4 ml-5">{name}</div>
        <div className="text-body4 w-96">{student_number}</div>
        <div className="text-body4 w-52">공개</div>
        <div className="text-body4">피드백 {feedback_count}</div>
      </article>
    </Link>
  );
};
