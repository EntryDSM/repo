import { Plus } from "@packages/ui/assets";

interface PropsType {
  value: string;
  onClick?: () => void;
}

export const ResumeTitle = ({ value, onClick }: PropsType) => (
  <div className="flex items-center justify-between h-[112px] px-10 ">
    <div className="text-title2">{value}</div>
    {onClick && (
      <div onClick={onClick}>
        <Plus size={24} />
      </div>
    )}
  </div>
);
