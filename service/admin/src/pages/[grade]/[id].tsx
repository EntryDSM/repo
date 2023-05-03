import { studentDetail } from "@/apis/document/get/studentDetail";
import { getStudent } from "@/apis/student";
import { PreviewResume, SideBar, TextArea } from "@packages/ui";
import Image from "next/image";
import { useRouter } from "next/router";
import { useQueries, useQuery } from "react-query";

const detail = () => {
  const { query } = useRouter();
  const { data } = useQuery(
    ["teacherPreview"],
    () => studentDetail(query.id as string),
    {
      enabled: !!query.id,
    }
  );
  const result = useQueries([
    { queryKey: ["class1"], queryFn: () => getStudent() },
  ]);
  console.log(query);
  return (
    <div>
      <SideBar>
        {data && <PreviewResume {...data.data} NextImage={Image} />}
      </SideBar>
    </div>
  );
};

export default detail;
