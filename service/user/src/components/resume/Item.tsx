import { ChangeEvent, MouseEventHandler, ReactNode } from "react";
import { Arrow, Delete } from "@packages/ui/assets";
import { useInversion } from "@packages/hooks/useInversion";

interface PropsType {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  onRemove: () => void;
  onMove: (index: number, state: number) => void;
  index: number;
  children: ReactNode;
}

export const ResumeItem = ({
  value,
  onChange,
  onRemove,
  onMove,
  placeholder,
  index,
  children,
}: PropsType) => {
  const { state: dropdown, inversion } = useInversion();
  const height = dropdown ? "h-[148px] overflow-hidden" : "h-auto";
  const isPlaceholder = !value && "text-gray300";
  return (
    <div
      className={`p-10 border-2 ${height} border-gray100 rounded-2xl bg-gray50 flex flex-col gap-10`}
    >
      <div className="flex h-fit py-[17px] shrink-0 justify-between items-center">
        <div
          className={`${isPlaceholder} flex gap-[6px] items-center max-w-[480px]`}
        >
          <p className="text-body1 break-all">{value || placeholder}</p>
          <div onClick={inversion}>
            <Arrow direction={dropdown ? "top" : "bottom"} size={24} />
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center bg-gray100 rounded-[8px] p-[2px]">
            <div
              onClick={() => onMove(index, 1)}
              className="transition-all p-[2px] rounded-[6px] hover:bg-gray50 cursor-pointer"
            >
              <Arrow direction="top" size={24} />
            </div>
            <div
              onClick={() => onMove(index, 0)}
              className="transition-all p-[2px] rounded-[6px] hover:bg-gray50 cursor-pointer"
            >
              <Arrow direction="bottom" size={24} />
            </div>
            <div
              onClick={onRemove}
              className="transition-all p-[4px] rounded-[6px] hover:bg-red100 cursor-pointer [&>svg>path]:hover:fill-error"
            >
              <Delete size={20} />
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};
