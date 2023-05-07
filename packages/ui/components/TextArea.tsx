import React, { ChangeEvent, useRef } from "react";

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
  limit,
  maxLine,
  placeholder,
  className,
}: Props) => {
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const onChangeSlice = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.target.value = e.target.value.slice(limit);
    onChange(e);
    if (!ref.current) return;
    ref.current.style.height = "24px";

    const height = ref.current.scrollHeight;
    if (maxLine && maxLine * 24 + 32 < height)
      ref.current.style.height = (maxLine || 0) * 24 + 32 + "px";
    else ref.current.style.height = height + "px";
  };
  return (
    <div className="w-full">
      <textarea
        ref={ref}
        name={name}
        onChange={onChangeSlice}
        className={`resize-none h-14 bg-gray100 w-full p-4 rounded ${className}`}
        placeholder={placeholder}
        value={value}
      />
      <div className="text-end text-body7">0/{limit}</div>
    </div>
  );
};
