import { ReactNode } from "react";
import { Close } from "@packages/ui/assets";

interface Props {
  children: ReactNode;
}

export const Tag = ({ children }: Props) => {
  return (
    <div className="bg-gray50 flex gap-3 items-center h-10 pl-5 pr-5 rounded">
      {children}
      <Close size={14} />
    </div>
  );
};
