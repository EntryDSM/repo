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

const Introduce = () => {
  return (
    <ResumeLayout>
      <ResumeTitle value="자기소개" onClick={() => {}} />
      <ResumeItem
        value="앙기모띠"
        onChange={() => {}}
        onRemove={() => {}}
        placeholder="asfsa"
      >
        <ImportLabel label="한 줄 소개" important>
          <TextArea name="" value="" placeholder="" onChange={() => {}} />
        </ImportLabel>
        <ImportLabel label="자기소개" important>
          <TextArea name="" value="" placeholder="" onChange={() => {}} />
        </ImportLabel>
      </ResumeItem>{" "}
    </ResumeLayout>
  );
};

export default Introduce;
