import { ResumeImg } from "@/components/ResumeImg";
import { DateInput } from "@/components/date";
import { FeedBack } from "@/components/resume/FeedBack";
import { Input, SKillInput, SkillList, TextArea } from "@packages/ui";
import { Plus } from "@packages/ui/assets";
import { ChangeEvent, useState } from "react";
import { ImportLabel } from "../../components/ImportLabel";
import { ResumeItem, ResumeLayout, ResumeTitle } from "../../components/resume";
import {
  onChange,
  useProfileWrite
} from "../../hooks/useWriteProfile";

export const Project = () => {
  const {
    state,
    toPreview,
    status,
    profileImg,
    mutate,
    setState,
    handleChange,
    addItem,
    moveItem,
    removeItem,
    addSkill,
    removeSkill,
    onDateChange,
    document_id,
  } = useProfileWrite(
    [
      {
        name: "",
        represent_image_path: "",
        start_date: "",
        end_date: "",
        skill_list: [],
        description: "",
        url: "",
        element_id: null,
        feedback: "",
      },
    ],
    "project_list"
  );
  const [imgs, setImgs] = useState<string[]>([]);
  
  return (
    <ResumeLayout
      mutate={mutate}
      profileImg={profileImg}
      status={status}
      toPreview={toPreview}
    >
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
          element_id,
        } = item;

        const onImgChange = (value: string) => {
          const copy = [...imgs];
          copy[index] = value;
          return copy;
        };

        const handleChangeArray = handleChange(index);
        const removeItemArray = removeItem(index);
        const addSKillArray = addSkill(index);
        const removeSKillArray = removeSkill(index);
        const onDateChangeArray = onDateChange(index);

        const onImgChangeArray = (e: ChangeEvent<HTMLInputElement>) => {
          const { name } = e.target;
          const copy = [...state];

          onChange(({ image_path }) => {
            copy.splice(index, 1, {
              ...state[index],
              [name]: image_path,
            });
            setState(copy);
            setImgs(onImgChange(image_path));
          }, e);
        };

        const imgUrl = imgs[index] || represent_image_path;
        const inputId = "projectLogo" + index;

        return (
          <ResumeItem
            value={name}
            onChange={() => {}}
            placeholder="프로젝트 명"
            onRemove={removeItemArray}
            onMove={moveItem}
            index={index}
            key={"projectListId" + index}
          >
            <FeedBack
              document_id={document_id}
              element_id={element_id}
              content={feedback}
            />
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
                id={inputId}
                type="file"
                className="hidden"
                name="represent_image_path"
                onChange={onImgChangeArray}
              />
              <label
                htmlFor={inputId}
                className="relative inline-block cursor-pointer"
              >
                <ResumeImg
                  src={imgUrl}
                  alt="프로젝트 로고"
                  width={100}
                  height={100}
                  className="w-[100px] h-[100px] object-cover rounded"
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
                  onSubmitAtInput={onDateChangeArray}
                />
                ~
                <DateInput
                  value={end_date}
                  name="end_date"
                  placeholder="종료일"
                  onSubmitAtInput={onDateChangeArray}
                />
              </div>
            </ImportLabel>
            <ImportLabel label=" 기술 스택" important>
              <div className="flex flex-col gap-[30px]">
                <SKillInput
                  name="skill_list"
                  className="w-full bg-gray100"
                  onAddSkill={addSKillArray}
                />
                <SkillList
                  name="skill_list"
                  list={skill_list}
                  onClickRemove={removeSKillArray}
                />
              </div>
            </ImportLabel>
            <ImportLabel label="프로젝트 내용" important>
              <TextArea
                value={description}
                placeholder="프로젝트 내용을 입력해 주세요"
                onChange={handleChangeArray}
                name="description"
                maxLine={20}
                limit={1200}
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
