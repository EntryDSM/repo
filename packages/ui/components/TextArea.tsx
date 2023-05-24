import React, { ChangeEvent, useEffect, useRef } from "react";

interface Props {
  name: string;
  value: string;
  limit?: number;
  maxLine?: number;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

export const TextArea = ({
  name,
  onChange,
  value,
  limit = 240,
  maxLine,
  placeholder,
  className,
}: Props) => {
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const textareaSizing = ({ current }: typeof ref) => {
    if (!current) return;
    current.style.height = "24px";

    const height = current.scrollHeight;
    if (maxLine && maxLine * 24 + 32 < height)
      current.style.height = (maxLine || 0) * 24 + 32 + "px";
    else current.style.height = height + "px";
  };
  
  const onChangeSlice = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.target.value = e.target.value.slice(0, limit);
    onChange(e);
  };

  useEffect(() => textareaSizing(ref), [value]);

  return (
    <div className="w-full">
      <textarea
        ref={ref}
        name={name}
        onChange={onChangeSlice}
        className={`resize-none h-50 bg-gray100 w-full p-4 rounded ${className}`}
        placeholder={placeholder}
        value={value}
      />
      <div className="text-end text-body7">
        {value.length}/{limit}
      </div>
    </div>
  );
};
