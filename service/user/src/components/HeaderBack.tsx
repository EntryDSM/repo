import { ReactNode } from "react";

interface PropsType {
  children: ReactNode;
}

export const HeaderBack = ({ children }: PropsType) => (
  <div className="mt-[120px]">
    <div className="absolute w-full h-[360px] bg-gray900">{children}</div>
  </div>
);
