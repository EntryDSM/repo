import { ImportLabel } from "@/components/ImportLabel";
import { ResumeTitle, ResumeLayout } from "@/components/resume";
import { Rectify } from "@packages/ui/assets";
import { Dropdown, Input, SKillInput, SkillList } from "@packages/ui";
import { ChangeEvent, useEffect, useState } from "react";
import {
  AddSkillFn,
  onChange,
  onClickItem,
  removeSkillFn,
  useProfileWrite,
} from "../../hooks/useWriteProfile";
import { WrtieInfoReqBody } from "../../apis/document/patch/WriteInfo";
import { FeedBack } from "@/components/resume/FeedBack";
import { getMajor } from "@/apis/major";
import { useQuery } from "react-query";

const student = {
  grade: ["1학년", "2힉년", "3학년"],
  class: ["1반", "2반", "3빈", "4반"],
  number: Array(20)
    .fill(1)
    .map((number, idx) => number + idx),
};

export const My = () => {
  const { state, toPreview, status, mutate, setState, handleChange } =
    useProfileWrite(
      {
        name: "",
        profile_image_url: "",
        email: "",
        major: { id: "", name: "" },
        grade: "",
        class_num: "",
        number: "",
        skill_list: [],
        student_id: "",
        element_id: "",
        feedback: "",
      },
      "writer"
    );
  const [img, setImg] = useState<string>("");

  const { data: major } = useQuery(["skillList"], getMajor);

  const onImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    onChange(({ base_url, image_path }) => {
      setState({ ...state, [name]: image_path });
      setImg(base_url + image_path);
    }, e);
  };

  const onDropdownSelect = (value: { keyword: string; name: string }) => {
    const temp = onClickItem(state, value);
    setState(temp);
  };

  const AddSKill = (value: { keyword: string; name: string }) => {
    const temp = AddSkillFn(state, value);

    setState(temp);
  };

  const removeSkill = (value: { index: number; name: string }) => {
    const temp = removeSkillFn(state, value);
    setState(temp);
  };

  return (
    <ResumeLayout mutate={mutate} status={status} toPreview={toPreview}>
      <ResumeTitle value="자기소개" />
      <div className="px-[40px] flex flex-col gap-10">
        <FeedBack
          id={{
            ...state,
            ...{ student_id: "", element_id: "", feedback: "" },
          }}
          content={state.feedback}
        />
        <ImportLabel label="프로필 이미지">
          <input
            id="profile"
            type="file"
            name="profile_image_path"
            onChange={onImgChange}
            className="hidden"
          />
          <label
            htmlFor="profile"
            className="relative inline-block cursor-pointer"
          >
            <img
              src={state.profile_image_url || img}
              className="w-40 h-40 object-cover rounded-[80px] bg-gray200"
            />
            <div className="absolute bottom-0 right-0 bg-gray100 p-2 rounded-full">
              <Rectify size={24} />
            </div>
          </label>
        </ImportLabel>
        <ImportLabel label="이름" important>
          <div className="text-body4 h-[46px] pl-1">{state.name}</div>
        </ImportLabel>
        <ImportLabel label="학번" important>
          <div className="flex justify-between gap-[15px] [&>div]:w-full ">
            <Dropdown
              kind="contained"
              className="w-full"
              name="grade"
              value={state.grade}
              lists={student.grade}
              onClick={onDropdownSelect}
              placeholder="학년"
            />
            <Dropdown
              kind="contained"
              className="w-full"
              name="class_num"
              value={state.class_num}
              lists={student.class}
              onClick={onDropdownSelect}
              placeholder="반"
            />
            <Dropdown
              kind="contained"
              className="w-full"
              name="number"
              value={state.number}
              lists={student.number}
              onClick={onDropdownSelect}
              placeholder="번호"
            />
          </div>
        </ImportLabel>
        <ImportLabel label="분야" important>
          <div className="[&>div]:w-full">
            {Array.isArray(major?.data.major_list) && (
              <Dropdown
                kind="contained"
                name="major_id"
                value={
                  major?.data.major_list.find((m) => state.major.id === m.id)
                    ?.name
                }
                onClick={({ keyword }) => {
                  //@ts-ignore
                  const { id, name } = keyword;
                  setState({
                    ...state,
                    major: { id: id, name: name },
                  });
                }}
                //@ts-ignore
                lists={major.data.major_list}
                objectKey="name"
                placeholder="frontend"
              />
            )}
          </div>
        </ImportLabel>
        <ImportLabel label="이메일" important>
          <Input
            value={state.email}
            name="email"
            placeholder="이메일을 입력해주세요"
            onChange={handleChange(0)}
          />
        </ImportLabel>
        <ImportLabel label="기술 스택">
          <div className="flex flex-col gap-[30px]">
            <SKillInput
              name="skill_list"
              onAddSkill={AddSKill}
              className="w-full bg-gray100"
            />
            <SkillList
              name="skill_list"
              list={state.skill_list}
              onClickRemove={removeSkill}
            />
          </div>
        </ImportLabel>
      </div>
    </ResumeLayout>
  );
};

export default My;
