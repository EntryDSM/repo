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
import { useQuery } from "@tanstack/react-query";
import { ResumeImg } from "@/components/ResumeImg";

const student = {
  grade: [1, 2, 3],
  class: [1, 2, 3, 4],
  number: Array(20)
    .fill(1)
    .map((number, idx) => number + idx),
};

export const My = () => {
  const {
    state,
    toPreview,
    status,
    profileImg,
    mutate,
    setState,
    handleChange,
    addSkill,
    removeSkill,
    onDropdownSelect,
    document_id,
  } = useProfileWrite(
    {
      name: "",
      profile_image_path: "",
      email: "",
      major: { id: "", name: "" },
      grade: 0,
      class_num: 0,
      number: 0,
      skill_list: [],
      student_id: "",
      element_id: "",
      feedback: "",
      url: "",
      student_number: 0,
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

  return (
    <ResumeLayout
      mutate={mutate}
      profileImg={profileImg}
      status={status}
      toPreview={toPreview}
    >
      <ResumeTitle value="자기소개" />
      <div className="px-[40px] flex flex-col gap-10">
        <FeedBack
          document_id={document_id}
          element_id={state.element_id}
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
            <ResumeImg
              src={img || state.profile_image_path}
              alt="자기소개 이미지"
              width={160}
              height={160}
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
              value={state.grade as any}
              lists={student.grade as any}
              onClick={onDropdownSelect}
              placeholder="학년"
              roleName="학년"
            />
            <Dropdown
              kind="contained"
              className="w-full"
              name="class_num"
              value={state.class_num as any}
              lists={student.class as any}
              onClick={onDropdownSelect}
              placeholder="반"
              roleName="반"
            />
            <Dropdown
              kind="contained"
              className="w-full"
              name="number"
              value={state.number as any}
              lists={student.number as any}
              onClick={onDropdownSelect}
              placeholder="번호"
              roleName="번"
            />
          </div>
        </ImportLabel>
        <ImportLabel label="분야" important>
          <div className="[&>div]:w-full">
            {Array.isArray(major?.data.major_list) && (
              <Dropdown
                kind="contained"
                name="major_id"
                value={state.major}
                onClick={({ keyword }) => {
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
              onAddSkill={addSkill(0)}
              className="w-full bg-gray100"
            />
            <SkillList
              name="skill_list"
              list={state.skill_list}
              onClickRemove={removeSkill(0)}
            />
          </div>
        </ImportLabel>
        <ImportLabel label="url">
          <Input
            value={state.url}
            name="url"
            placeholder="추가할 포트폴리오 링크가 있다면 입력해주세요"
            onChange={handleChange(0)}
          />
        </ImportLabel>
      </div>
    </ResumeLayout>
  );
};

export default My;
