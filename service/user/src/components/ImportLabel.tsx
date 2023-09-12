import { ReactNode } from "react";

interface PropsType {
  label: string;
  important?: boolean;
  children: ReactNode;
}

export const ImportLabel = ({ label, important, children }: PropsType) => {
  return (
    <div className="flex justify-between">
      <p className="text-body3">
        {label} {important && <span className="text-red">*</span>}
      </p>
      <div className="w-[480px]">{children}</div>
    </div>
  );
};
