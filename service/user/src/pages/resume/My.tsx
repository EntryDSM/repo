import { ImportLabel } from "@/components/ImportLabel";
import { ResumeLayout } from "@/components/ResumeLayout";
import { ResumeTitle } from "@/components/ResumeTitle";
import {
  Dropdown,
  Input,
  SKillInput,
  SkillList,
} from "../../../../../packages/ui";

export const My = () => {
  return (
    <ResumeLayout>
      <ResumeTitle value="자기소개" />
      <ImportLabel label="프로필 이미지">
        <img width={160} height={160} cla/>
      </ImportLabel>
      <ImportLabel label="이름" important>
        <Input value={""} placeholder="" onChange={() => {}} kind="custom" />
      </ImportLabel>
      <ImportLabel label="학번" important>
        <Dropdown lists={["dkdlasf"]} placeholder="1학년" />
      </ImportLabel>
      <ImportLabel label="분야" important>
        <Dropdown lists={[]} placeholder="frontend" />
      </ImportLabel>
      <ImportLabel label="이메일" important>
        <Input value={""} placeholder="" onChange={() => {}} kind="custom" />
      </ImportLabel>
      <ImportLabel label="기술 스택">
        <div>
          <SKillInput onAddSkill={() => {}} />
          <SkillList list={[]} onClickRemove={() => {}} />
        </div>
      </ImportLabel>
      <ImportLabel label="추가 포트폴리오">
        <Input
          value={""}
          placeholder=""
          onChange={() => {}}
          kind="custom"
          className="bg-gray100"
        />
      </ImportLabel>
    </ResumeLayout>
  );
};

export default My;
