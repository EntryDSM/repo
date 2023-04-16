import { ImportLabel } from "@/components/ImportLabel";
import { ResumeTitle, ResumeItem, ResumeLayout } from "@/components/resume";
import { Input, SKillInput, SkillList, TextArea } from "@packages/ui";
import { Plus } from "@packages/ui/assets";
import { ChangeEvent } from "react";
import {
  AddSkillFn,
  onChange,
  removeSkillFn,
  useProfileWriteArray,
} from "../../hooks/useWriteProfile";

export const Project = () => {
  const { state, setState, handleChange, addItem, removeItem } =
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
        ) => {
          const handleChangeArray = handleChange(index);
          const removeItemArray = removeItem(index);

          const addSkillArray = (value: { keyword: string; name: string }) => {
            const copy = [...state];
            copy.splice(index, 1, AddSkillFn(state[index], value));
            setState(copy);
          };
          const onImgChangeArray = (e: ChangeEvent<HTMLInputElement>) => {
            const { name } = e.target;
            const copy = [...state];

            onChange((value) => {
              copy.splice(index, 1, {
                ...state[index],
                [name]: value as string,
              });
              setState(copy);
            }, e);
          };
          const removeSkillArray = (value: { index: number; name: string }) => {
            const copy = [...state];
            copy.splice(index, 1, removeSkillFn(state[index], value));
            setState(copy);
          };

          return (
            <ResumeItem
              value={name}
              onChange={() => {}}
              placeholder="프로젝트 명"
              onRemove={removeItemArray}
            >
              <ImportLabel label="프로젝트 명" important>
                <Input
                  value={name}
                  name="name"
                  placeholder="프로젝트 이름을 입력해 주세요"
                  onChange={handleChangeArray}
                />
              </ImportLabel>
              <ImportLabel label="프로젝트 로고">
                <input
                  id="logo"
                  type="file"
                  className="hidden"
                  name="represent_image_path"
                  onChange={onImgChangeArray}
                />
                <label
                  htmlFor="logo"
                  className="relative inline-block cursor-pointer"
                >
                  <img
                    src={represent_image_path}
                    alt=""
                    className="w-[100px] h-[100px] object-cover rounded bg-gray200"
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
                    onChange={handleChangeArray}
                  />
                  ~
                  <Input
                    value={end_date}
                    name="end_date"
                    placeholder="종료일"
                    onChange={handleChangeArray}
                  />
                </div>
              </ImportLabel>
              <ImportLabel label=" 기술 스택" important>
                <div className="flex flex-col gap-[30px]">
                  <SKillInput
                    name="skill_list"
                    className="w-full bg-gray100"
                    onAddSkill={addSkillArray}
                  />
                  <SkillList
                    name="skill_list"
                    list={skill_list}
                    onClickRemove={removeSkillArray}
                  />
                </div>
              </ImportLabel>
              <ImportLabel label="프로젝트 내용" important>
                <TextArea
                  value={description}
                  placeholder="프로젝트 내용을 입력해 주세요"
                  onChange={handleChangeArray}
                  name="description"
                />
              </ImportLabel>
              <ImportLabel label="url">
                <Input
                  value={url}
                  name="url"
                  placeholder="https://"
                  onChange={handleChangeArray}
                />
              </ImportLabel>
            </ResumeItem>
          );
        }
      )}
    </ResumeLayout>
  );
};

export default Project;
