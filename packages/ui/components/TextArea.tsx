import React, { ChangeEvent } from "react";

interface Props {
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextArea = ({ name, onChange, value, placeholder }: Props) => {
  return (
    <div>
      <textarea
        name={name}
        onChange={onChange}
        className="resize-none h-96 bg-gray100"
        placeholder={placeholder}
        value={value}
      />
      <div className="text-end text-body7">0/21313</div>
    </div>
  );
};
