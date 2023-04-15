import { ChangeEvent, Children, ReactNode } from "react";
import { Arrow, Delete } from "../../../../packages/ui/assets";
import { useInversion } from "../../../../packages/hooks/useInversion";
import { Input } from "../../../../packages/ui";

interface PropsType {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  onRemove: () => void;
  children: ReactNode;
}

export const ResumeItem = ({
  value,
  onChange,
  onRemove,
  placeholder,
  children,
}: PropsType) => {
  const { state: dropdown, inversion } = useInversion();
  const height = dropdown ? "h-[148px]" : "h-auto";
  return (
    <div
      className={`p-10 transition-all border-2 ${height} border-gray100 bg-gray50 flex flex-col gap-10 overflow-hidden`}
    >
      <div className="flex h-[66px] shrink-0 justify-between items-center">
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="visited:border-0 focus:border-0 focus-visible:border-gray50 text-body1 flex flex-col pl-0"
        />
        <div className="flex items-center gap-5">
          <div onClick={inversion}>
            <Arrow direction={dropdown ? "top" : "bottom"} />
          </div>
          <div onClick={onRemove}>
            <Delete size={24} />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};
