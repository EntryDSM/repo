import Image from "next/image";
import { PreviewResume, SideBar } from "@packages/ui";
import { useQuery } from "react-query";
import { detail } from "@/apis/document/get/detail";
import { useRouter } from "next/router";
import { myDetail } from "@/apis/document/get/myDetail";

const Preview = () => {
  const { data } = useQuery(["writePreview"], () => myDetail(), {
    staleTime: Infinity,
  });
  return (
    <SideBar preview>
      {data && <PreviewResume {...(data.data as any)} />}
    </SideBar>
  );
};

export default Preview;
