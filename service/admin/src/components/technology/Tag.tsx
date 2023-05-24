import { ReactNode } from "react";
import { Close } from "@packages/ui/assets";
import { MajorList } from "@/apis/major";

interface Props {
  data: MajorList;
  onClick: (uuid: string) => void;
}

export const Tag = ({ data, onClick }: Props) => {
  return (
    <div
      onClick={() => onClick(data.id)}
      className="bg-gray50 flex gap-3 items-center h-10 pl-5 pr-5 rounded cursor-pointer"
    >
      {data.name}
      <Close size={14} />
    </div>
  );
};
