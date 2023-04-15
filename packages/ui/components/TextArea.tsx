import React, { ChangeEvent } from "react";

interface Props {
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

export const TextArea = ({
  name,
  onChange,
  value,
  placeholder,
  className,
}: Props) => {
  return (
    <div className="w-full">
      <textarea
        name={name}
        onChange={onChange}
        className="resize-none h-96 bg-gray100 w-full"
        placeholder={placeholder}
        value={value}
      />
      <div className="text-end text-body7">0/21313</div>
    </div>
  );
};
