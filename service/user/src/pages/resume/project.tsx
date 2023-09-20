import { ResumeImg } from "@/components/ResumeImg";
import { DateInput } from "@/components/date";
import { FeedBack } from "@/components/resume/FeedBack";
import { BtnInputList, Input, BtnInput, TextArea } from "@packages/ui";
import { Check, Plus } from "@packages/ui/assets";
import { ChangeEvent } from "react";
import { ImportLabel } from "../../components/ImportLabel";
import { ResumeItem, ResumeLayout, ResumeTitle } from "../../components/resume";
import { onChange, useProfileWrite } from "../../hooks/useWriteProfile";

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
    initDate,
    toggleThings,
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
        is_period: true,
        skill_list: [],
        type: "TEAM",
        description: "",
        urls: [],
        element_id: null,
        feedback: "",
      },
    ],
    "project_list"
  );

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
          is_period,
          skill_list,
          type,
          description,
          urls,
          feedback,
          element_id,
        } = item;

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
          }, e);
        };

        const imgUrl = represent_image_path || "";
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
              <div className="flex items-center bg-gray100 rounded-[8px] p-[2px] w-fit mt-[12px] text-body5 cursor-pointer">
                <div
                  className={`${
                    type === "TEAM" && "bg-gray50"
                  } hover:bg-gray50 flex items-center justify-center w-[64px] h-[32px] rounded-[6px] transition-all`}
                  onClick={() => toggleThings(index, "TEAM")}
                >
                  팀
                </div>
                <div
                  className={`${
                    type === "PERSONAL" && "bg-gray50"
                  } hover:bg-gray50 flex items-center justify-center w-[64px] h-[32px] rounded-[6px] transition-all`}
                  onClick={() => toggleThings(index, "PERSONAL")}
                >
                  개인
                </div>
              </div>
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
              {!is_period ? (
                <DateInput
                  value={start_date}
                  name="start_date"
                  placeholder="시작일"
                  onSubmitAtInput={onDateChangeArray}
                />
              ) : (
                <div className="flex items-center justify-between gap-[14px] w-full">
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
              )}
              <div className="flex gap-3 pt-4">
                <div
                  className={`transition-all bg-gray50 flex justify-center items-center rounded-sm border-2 border-gray400 w-6 h-6 cursor-pointer hover:bg-gray100 ${
                    !is_period && "bg-gray900 border-gray900 hover:bg-gray600"
                  }`}
                  onClick={() => initDate(index)}
                >
                  {!is_period && <Check size={24} color="white" />}
                </div>
                진행중
              </div>
            </ImportLabel>
            <ImportLabel label=" 기술 스택" important>
              <div className="flex flex-col gap-[30px]">
                <BtnInput
                  name="skill_list"
                  className="w-full bg-gray100"
                  placeholder="기술 스택을 입력해 주세요"
                  onAddSkill={addSKillArray}
                />
                <BtnInputList
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
                limit={1500}
              />
            </ImportLabel>
            <ImportLabel label="url">
              <div className="flex flex-col gap-[30px]">
                <BtnInput
                  name="urls"
                  className="w-full bg-gray100"
                  placeholder="https://"
                  onAddSkill={addSKillArray}
                />
                <BtnInputList
                  name="urls"
                  list={urls}
                  onClickRemove={removeSKillArray}
                />
              </div>
            </ImportLabel>
          </ResumeItem>
        );
      })}
    </ResumeLayout>
  );
};

export default Project;
