import { ChangeEvent, ReactNode } from "react";
import { Arrow, Delete } from "@packages/ui/assets";
import { useInversion } from "@packages/hooks/useInversion";

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
  const height = dropdown ? "h-[148px] overflow-hidden" : "h-auto";
  const isPlaceholder = !value && "text-gray300";
  return (
    <div
      className={`p-10 border-2 ${height} border-gray100 rounded-2xl bg-gray50 flex flex-col gap-10`}
    >
      <div className="flex h-[66px] shrink-0 justify-between items-center">
        <div className={`text-body1 ${isPlaceholder}`}>
          {value || placeholder}
        </div>
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
