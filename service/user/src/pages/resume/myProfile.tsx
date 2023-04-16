import { ImportLabel } from "@/components/ImportLabel";
import { ResumeLayout } from "@/components/ResumeLayout";
import { ResumeTitle } from "@/components/ResumeTitle";
import { Rectify } from "@packages/ui/assets";
import { Dropdown, Input, SKillInput, SkillList } from "@packages/ui";
import { ChangeEvent } from "react";
import {
  AddSkillFn,
  onChange,
  onClickItem,
  removeSkillFn,
  useProfileWrite,
} from "../../hook/useWriteProfile";

const student = {
  grade: ["1학년", "2힉년", "3학년"],
  class: ["1반", "2반", "3빈", "4반"],
  number: Array(20)
    .fill(1)
    .map((number, idx) => number + idx),
};

export const My = () => {
  const { state, setState, handleChange } = useProfileWrite(
    {
      name: "",
      profile_image_path: "",
      email: "",
      major: "",
      grade: "",
      class_num: "",
      number: "",
      skill: [],
    },
    "introduce"
  );

  const onImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    onChange((value) => setState({ ...state, [name]: value }), e);
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
    <ResumeLayout>
      <ResumeTitle value="자기소개" />
      <div className="px-[40px] flex flex-col gap-10">
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
              src={state.profile_image_path}
              className="w-40 h-40 object-cover rounded-[80px] bg-gray200"
            />
            <div className="absolute bottom-0 right-0 bg-gray100 p-2 rounded-full">
              <Rectify size={24} />
            </div>
          </label>
        </ImportLabel>
        <ImportLabel label="이름" important>
          <Input
            value={state.name}
            placeholder="이름을 입력해주세요"
            onChange={handleChange}
            name="name"
          />
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
            <Dropdown
              kind="contained"
              name="major"
              value={state.major}
              onClick={onDropdownSelect}
              lists={["frontend"]}
              placeholder="frontend"
            />
          </div>
        </ImportLabel>
        <ImportLabel label="이메일" important>
          <Input
            value={state.email}
            name="email"
            placeholder="이메일을 입력해주세요"
            onChange={handleChange}
          />
        </ImportLabel>
        <ImportLabel label="기술 스택">
          <div className="flex flex-col gap-[30px]">
            <SKillInput
              name="skill"
              onAddSkill={AddSKill}
              className="w-full bg-gray100"
            />
            <SkillList
              name="skill"
              list={state.skill}
              onClickRemove={removeSkill}
            />
          </div>
        </ImportLabel>
        <ImportLabel label="추가 포트폴리오">
          <Input
            value={""}
            placeholder="https://"
            onChange={() => {}}
            className="bg-gray100"
          />
        </ImportLabel>
      </div>
    </ResumeLayout>
  );
};

export default My;
