import { ImportLabel } from "@/components/ImportLabel";
import { ResumeItem } from "@/components/ResumeItem";
import { ResumeLayout } from "@/components/ResumeLayout";
import { ResumeTitle } from "@/components/ResumeTitle";
import {
  Input,
  SKillInput,
  SkillList,
  TextArea,
} from "../../../../../packages/ui";

export const Project = () => {
  return (
    <ResumeLayout>
      <ResumeTitle value="프로젝트" onClick={() => {}} />
      <ResumeItem
        value="asf"
        onChange={() => {}}
        placeholder=""
        onRemove={() => []}
      >
        <ImportLabel label="프로젝트 명">
          <Input value={""} placeholder="" onChange={() => {}} />
        </ImportLabel>
        <ImportLabel label="프로젝트 로고">
          <div>
            <img />
          </div>
        </ImportLabel>
        <ImportLabel label="기간">
          <div>
            <Input value={""} placeholder="" onChange={() => {}} />
            <Input value={""} placeholder="" onChange={() => {}} />
          </div>
        </ImportLabel>
        <ImportLabel label=" 기술 스택">
          <div>
            <SKillInput onAddSkill={() => {}} />
            <SkillList list={[]} onClickRemove={() => {}} />
          </div>
        </ImportLabel>
        <ImportLabel label="프로젝트 내용">
          <TextArea value="" placeholder="" onChange={() => {}} name="" />
        </ImportLabel>
        <ImportLabel label="url">
          <div>
            <SKillInput onAddSkill={() => {}} />
            <SkillList list={[]} onClickRemove={() => {}} />
          </div>
        </ImportLabel>
      </ResumeItem>
    </ResumeLayout>
  );
};

export default Project;
