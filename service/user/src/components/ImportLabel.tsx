import React, { ReactNode } from "react";

interface PropsType {
  label: string;
  important?: boolean;
  children: ReactNode;
}

export const ImportLabel = ({ label, important, children }: PropsType) => {
  return (
    <div className="flex justify-between">
      <div className="text-body3">
        {label} {important && <span className="text-red">*</span>}
      </div>
      <div className="w-[480px]">{children}</div>
    </div>
  );
};
