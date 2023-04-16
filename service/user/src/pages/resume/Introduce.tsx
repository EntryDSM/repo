import { HeaderBack } from "@/components/HeaderBack";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import {
  Button,
  Dropdown,
  Input,
  SKillInput,
  SkillList,
  TextArea,
} from "@packages/ui";
import { Plus, Search } from "@packages/ui/assets";
import Link from "next/link";
import { ReactNode } from "react";
import { ImportLabel } from "@/components/ImportLabel";
import { ResumeTitle } from "@/components/ResumeTitle";
import { ResumeItem } from "@/components/ResumeItem";
import { ResumeLayout } from "@/components/ResumeLayout";
import { useProfileWrite } from "../../hook/useWriteProfile";

const Introduce = () => {
  const { state, handleChange } = useProfileWrite(
    {
      heading: "",
      introduce: "",
    },
    "introduce"
  );
  return (
    <ResumeLayout>
      <ResumeTitle value="자기소개" />
      <div className="px-[40px] flex flex-col gap-10">
        <ImportLabel label="한 줄 소개" important>
          <TextArea
            name="heading"
            value={state.heading}
            placeholder="한 줄 소개를 입력해주세요"
            onChange={handleChange}
          />
        </ImportLabel>
        <ImportLabel label="자기소개" important>
          <TextArea
            name="introduce"
            value={state.introduce}
            placeholder="자기소개를 입력해주세요"
            onChange={handleChange}
          />
        </ImportLabel>
      </div>
    </ResumeLayout>
  );
};

export default Introduce;
