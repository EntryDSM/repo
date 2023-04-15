import { ImportLabel } from "@/components/ImportLabel";
import { ResumeLayout } from "@/components/ResumeLayout";
import { ResumeTitle } from "@/components/ResumeTitle";
import { Rectify } from "../../../../../packages/ui/assets";
import {
  Dropdown,
  Input,
  SKillInput,
  SkillList,
} from "../../../../../packages/ui";
import { ChangeEvent } from "react";

const student = {
  grade: ["1학년", "2힉년", "3학년"],
  class: ["1반", "2반", "3빈", "4반"],
  number: [
    "1번",
    "1번",
    "1번",
    "1번",
    "1번",
    "1번",
    "1번",
    "1번",
    "1번",
    "1번",
    "1번",
    "1번",
    "1번",
    "1번",
    "1번",
    "1번",
    "1번",
    "1번",
    "1번",
    "1번",
  ],
};

export const My = () => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const render = new FileReader();
    render.readAsDataURL(file);
    render.onloadend = () => {};
  };
  return (
    <ResumeLayout>
      <ResumeTitle value="자기소개" />
      <div className="px-[40px] flex flex-col gap-10">
        <ImportLabel label="프로필 이미지">
          <input
            id="profile"
            type="file"
            onChange={onChange}
            className="hidden"
          />
          <label
            htmlFor="profile"
            className="relative inline-block cursor-pointer"
          >
            <img
              width={160}
              height={160}
              className="rounded-[80px] bg-gray200"
            />
            <div className="absolute bottom-0 right-0 bg-gray100 p-2 rounded-full">
              <Rectify size={24} />
            </div>
          </label>
        </ImportLabel>
        <ImportLabel label="이름" important>
          <Input
            value={""}
            placeholder="이름을 입력해주세요"
            onChange={() => {}}
          />
        </ImportLabel>
        <ImportLabel label="학번" important>
          <div className="flex justify-between gap-[15px] [&>div]:w-full ">
            <Dropdown
              kind="contained"
              className="w-full"
              lists={student.grade}
              placeholder="1학년"
            />
            <Dropdown
              kind="contained"
              className="w-full"
              lists={student.class}
              placeholder="1학년"
            />
            <Dropdown
              kind="contained"
              className="w-full"
              lists={student.number}
              placeholder="1학년"
            />
          </div>
        </ImportLabel>
        <ImportLabel label="분야" important>
          <div className="[&>div]:w-full">
            <Dropdown kind="contained" lists={[]} placeholder="frontend" />
          </div>
        </ImportLabel>
        <ImportLabel label="이메일" important>
          <Input
            value={""}
            placeholder="이메일을 입력해주세요"
            onChange={() => {}}
          />
        </ImportLabel>
        <ImportLabel label="기술 스택">
          <div className="flex flex-col gap-[30px]">
            <SKillInput onAddSkill={() => {}} />
            <SkillList list={["앙기모띠"]} onClickRemove={() => {}} />
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
