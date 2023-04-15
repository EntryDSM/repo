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
import { Plus } from "../../../../../packages/ui/assets";
import { ChangeEvent } from "react";

export const Project = () => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const render = new FileReader();
    render.readAsDataURL(file);
    render.onloadend = () => {};
  };
  return (
    <ResumeLayout>
      <ResumeTitle value="프로젝트" onClick={() => {}} />
      <ResumeItem
        value="asf"
        onChange={() => {}}
        placeholder=""
        onRemove={() => []}
      >
        <ImportLabel label="프로젝트 명" important>
          <Input
            value={""}
            placeholder="프로젝트 이름을 입력해 주세요"
            onChange={() => {}}
          />
        </ImportLabel>
        <ImportLabel label="프로젝트 로고">
          <input id="logo" type="file" className="hidden" />
          <label htmlFor="logo" className="relative cursor-pointer">
            <img width={100} height={100} className="rounded bg-gray200" />
            <div className="absolute left-[38px] top-[38px] border-0">
              <Plus size={24} />
            </div>
          </label>
        </ImportLabel>
        <ImportLabel label="기간" important>
          <div className="flex items-center justify-between gap-[14px]">
            <Input value={""} placeholder="시작일" onChange={() => {}} />
            ~
            <Input value={""} placeholder="종료일" onChange={() => {}} />
          </div>
        </ImportLabel>
        <ImportLabel label=" 기술 스택" important>
          <div>
            <SKillInput onAddSkill={() => {}} />
            <SkillList list={[]} onClickRemove={() => {}} />
          </div>
        </ImportLabel>
        <ImportLabel label="프로젝트 내용" important>
          <TextArea
            value=""
            placeholder="프로젝트 내용을 입력해 주세요"
            onChange={() => {}}
            name=""
          />
        </ImportLabel>
        <ImportLabel label="url">
          <Input value={""} placeholder="https://" onChange={() => {}} />
        </ImportLabel>
      </ResumeItem>
    </ResumeLayout>
  );
};

export default Project;
