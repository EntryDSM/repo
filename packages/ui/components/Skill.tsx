import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { Input } from "./Input";
import { Button } from "./Button";
import { Close } from "../assets";

interface PropsType {
  name: string;
  className?: string;
  onAddSkill: (keyword: { keyword: string; name: string }) => void;
}

export const SKillInput = ({ onAddSkill, className, name }: PropsType) => {
  const [keyword, setKeyword] = useState<string>("");
  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setKeyword(e.target.value);
  const onClickAddSKill = () => {
    console.log(keyword);
    if (!keyword) return;
    onAddSkill({ keyword, name });
    setKeyword("");
  };
  const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) onClickAddSKill();
  };
  return (
    <div>
      <div className="w-full gap-[15px] flex items-center">
        <Input
          value={keyword}
          onChange={onChange}
          placeholder="기술 스택을 입력해 주세요"
          className={className}
          onKeyDown={onEnter}
          kind="custom"
        />
        <Button kind="contained" onClick={onClickAddSKill}>
          추가
        </Button>
      </div>
    </div>
  );
};

interface ListType {
  list: string[];
  name: string;
  onClickRemove: (index: { index: number; name: string }) => void;
  className?: string;
}

export const SkillList = ({
  list,
  className,
  name,
  onClickRemove,
}: ListType) => {
  return (
    <div className="w-full flex flex-wrap gap-x-[14px] gap-y-5">
      {list &&
        list.map((skill, index) => (
          <div
            className={`h-10 cursor-pointer bg-gray100 hover:bg-gray200 text-body5 rounded-sm flex items-center gap-3 px-5 ${className}`}
            onClick={() => onClickRemove({ index, name })}
            key={index}
          >
            {skill}
            <Close size={12} />
          </div>
        ))}
    </div>
  );
};
