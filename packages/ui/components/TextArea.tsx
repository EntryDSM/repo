import React, { ChangeEvent } from "react";

interface Props {
  name: string;
  value: string;
  limit?: number;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

export const TextArea = ({
  name,
  onChange,
  value,
  limit,
  placeholder,
  className,
}: Props) => {
  const onChangeSlice = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.target.value = e.target.value.slice(limit);
    onChange(e);
  };
  return (
    <div className="w-full">
      <textarea
        name={name}
        onChange={onChangeSlice}
        className={`resize-none h-96 bg-gray100 w-full p-4 rounded ${className}`}
        placeholder={placeholder}
        value={value}
      />
      <div className="text-end text-body7">0/21313</div>
    </div>
  );
};
