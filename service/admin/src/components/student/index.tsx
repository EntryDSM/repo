import Image from "next/image";
import dummy from "@packages/ui/assets/dummy.png";
import Link from "next/link";
import { StudentType } from "@/apis/student";

const statusKr = {
  CREATED: "미제출",
  SUBMITTED: "제출",
  SHARED: "공유",
};

export const Student = ({
  student_id,
  document_id,
  document_status,
  name,
  feedback_count,
  student_number,
  profile_image_url,
}: StudentType) => {
  const hasFeedback = feedback_count ? "text-blue" : "text-gray300";
  return (
    <Link href={`/${student_id}`}>
      <article className="flex w-[1120px] px-10 py-5 items-center bg-gray50 rounded-md">
        <Image
          width={46}
          height={46}
          src={profile_image_url}
          alt="학생관리 프로필 이미지"
          className=" rounded-full"
        />
        <div className="w-28 text-body3 ml-5">{name}</div>
        <div className="text-body4 w-96">{student_number}</div>
        <div className="text-body4 w-52">{statusKr[document_status]}</div>
        <div className={`text-body4 ${hasFeedback}`}>
          피드백 {feedback_count}
        </div>
      </article>
    </Link>
  );
};
