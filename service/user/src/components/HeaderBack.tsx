import { ReactNode } from "react";

interface PropsType {
  children: ReactNode;
}

export const HeaderBack = ({ children }: PropsType) => (
  <div className="mt-[120px]">
    <div className="absolute top-[80px] w-full h-[360px] bg-gray900" />
    <div className="relative z-2">{children}</div>
  </div>
);
