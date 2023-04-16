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
import { useProfileWriteArray } from "../../hook/useWriteProfile";

export const Project = () => {
  const { state, onImgChange, handleChange, AddSKill, addItem, removeItem } =
    useProfileWriteArray(
      {
        name: "",
        represent_image_path: "",
        start_date: "",
        end_date: "",
        skill_list: [],
        description: "",
        url: "",
      },
      "project_list"
    );
  return (
    <ResumeLayout>
      <ResumeTitle value="프로젝트" onClick={addItem} />
      {state.map(
        (
          {
            name,
            represent_image_path,
            start_date,
            end_date,
            skill_list,
            description,
            url,
          },
          index
        ) => (
          <ResumeItem
            value={name}
            onChange={() => {}}
            placeholder="프로젝트 명"
            onRemove={removeItem(index)}
          >
            <ImportLabel label="프로젝트 명" important>
              <Input
                value={name}
                name="name"
                placeholder="프로젝트 이름을 입력해 주세요"
                onChange={handleChange(index)}
              />
            </ImportLabel>
            <ImportLabel label="프로젝트 로고">
              <input
                id="logo"
                type="file"
                className="hidden"
                onChange={onImgChange(index)}
              />
              <label htmlFor="logo" className="relative cursor-pointer">
                <img
                  width={100}
                  height={100}
                  src={represent_image_path}
                  className="rounded bg-gray200"
                />
                <div className="absolute left-[38px] top-[38px] border-0">
                  <Plus size={24} />
                </div>
              </label>
            </ImportLabel>
            <ImportLabel label="기간" important>
              <div className="flex items-center justify-between gap-[14px]">
                <Input
                  value={start_date}
                  name="start_date"
                  placeholder="시작일"
                  onChange={handleChange(index)}
                />
                ~
                <Input
                  value={end_date}
                  name="end_date"
                  placeholder="종료일"
                  onChange={handleChange(index)}
                />
              </div>
            </ImportLabel>
            <ImportLabel label=" 기술 스택" important>
              <div>
                <SKillInput
                  name="skill_list"
                  className="w-full bg-gray100"
                  onAddSkill={AddSKill(index)}
                />
                <SkillList list={skill_list} onClickRemove={() => {}} />
              </div>
            </ImportLabel>
            <ImportLabel label="프로젝트 내용" important>
              <TextArea
                value={description}
                placeholder="프로젝트 내용을 입력해 주세요"
                onChange={handleChange(index)}
                name="description"
              />
            </ImportLabel>
            <ImportLabel label="url">
              <Input
                value={url}
                name="url"
                placeholder="https://"
                onChange={() => {}}
              />
            </ImportLabel>
          </ResumeItem>
        )
      )}
    </ResumeLayout>
  );
};

export default Project;
