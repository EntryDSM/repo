import Image from "next/image";
import { PreviewResume, SideBar } from "../../../../packages/ui";
import { useQuery } from "react-query";
import { detail } from "@/apis/document/get/detail";
import { useRouter } from "next/router";

const Preview = () => {
  const { query } = useRouter();
  console.log(query.id);
  const { data } = useQuery(
    ["writePreview"],
    () => detail(query.id as string),
    { enabled: !!query.id, staleTime: Infinity }
  );
  return (
    <SideBar preview>
      {data && <PreviewResume {...data.data} NextImage={Image} />}
    </SideBar>
  );
};

export default Preview;
