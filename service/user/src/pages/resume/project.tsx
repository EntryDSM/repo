import { ImportLabel } from "../../components/ImportLabel";
import { ResumeTitle, ResumeItem, ResumeLayout } from "../../components/resume";
import { Input, SKillInput, SkillList, TextArea } from "@packages/ui";
import { Plus } from "@packages/ui/assets";
import { ChangeEvent, useEffect, useState } from "react";
import {
  AddSkillFn,
  onChange,
  removeSkillFn,
  useProfileWrite,
} from "../../hooks/useWriteProfile";
import { FeedBack } from "@/components/resume/FeedBack";
import { DateInput } from "@/components/date";

export const Project = () => {
  const { state, status, mutate, setState, handleChange, addItem, removeItem } =
    useProfileWrite(
      [
        {
          name: "",
          represent_image_path: "",
          start_date: "",
          end_date: "",
          skill_list: [],
          description: "",
          url: "",
          document_id: "",
          element_id: "",
          feedback: "",
        },
      ],
      "project_list"
    );
  const [imgs, setImgs] = useState<string[]>([]);
  return (
    <ResumeLayout mutate={mutate} status={status}>
      <ResumeTitle value="프로젝트" onClick={addItem} />
      {state.map((item, index) => {
        const {
          name,
          represent_image_path,
          start_date,
          end_date,
          skill_list,
          description,
          url,
          feedback,
        } = item;

        const onImgChange = (value: string) => {
          const copy = [...imgs];
          copy[index] = value;
          return copy;
        };

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

          onChange(({ base_url, image_path }) => {
            copy.splice(index, 1, {
              ...state[index],
              [name]: image_path,
            });
            setState(copy);
            setImgs(onImgChange(base_url + image_path));
          }, e);
        };
        const removeSkillArray = (value: { index: number; name: string }) => {
          const copy = [...state];
          copy.splice(index, 1, removeSkillFn(state[index], value));
          setState(copy);
        };
        const onDateChange = ({
          value,
          name,
        }: {
          value: string;
          name: string;
        }) => {
          const copy = [...state];
          copy.splice(index, 1, { ...item, [name]: value });
          setState(copy);
        };

        const imgUrl = imgs[index] || represent_image_path;

        return (
          <ResumeItem
            value={name}
            onChange={() => {}}
            placeholder="프로젝트 명"
            onRemove={removeItemArray}
          >
            <FeedBack id={item} content={feedback} />
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
                  src={imgUrl}
                  alt="프로젝트 로고"
                  className="w-[100px] h-[100px] object-cover rounded bg-gray200"
                />
                {!imgUrl && (
                  <div className="absolute left-[38px] top-[38px] border-0">
                    <Plus size={24} />
                  </div>
                )}
              </label>
            </ImportLabel>
            <ImportLabel label="기간" important>
              <div className="flex items-center justify-between gap-[14px]">
                <DateInput
                  value={start_date}
                  name="start_date"
                  placeholder="시작일"
                  onSubmitAtInput={onDateChange}
                />
                ~
                <DateInput
                  value={end_date}
                  name="end_date"
                  placeholder="종료일"
                  onSubmitAtInput={onDateChange}
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
      })}
    </ResumeLayout>
  );
};

export default Project;
