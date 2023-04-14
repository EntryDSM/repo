import { ReactNode } from "react";

interface PropsType {
  className?: string;
  radius?: "normal" | "circle";
  kind?:
    | "contained"
    | "outline"
    | "underline"
    | "text"
    | "success"
    | "point"
    | "critical";
  disabled?: boolean;
  children: ReactNode;
  onClick?: () => void;
  width?: number;
}

const defaultDisable = "bg-gray200 text-gray50";

const buttonColor = {
  contained: {
    enable: "bg-gray800 text-gray50 hover:bg-gray500 active:bg-gray400",
    disable: defaultDisable,
  },
  outline: {
    enable:
      "border-2 text-gray800 hover:text-gray50 hover:border-gray600 hover:bg-gray600 active:text-gray50 active:bg-gray500",
    disable: "border-2 border-gray300 text-gray300",
  },
  underline: {
    enable: "underline bg-gray50 text-gray600 hover:text-gray500",
    disable: "underline text-gray200",
  },
  text: {
    enable: "bg-gray50 hover:bg-gray100 active:bg-gray200",
    disable: "text-gray200",
  },
  success: {
    enable:
      "text-gray50 bg-green hover:bg-green200 active:bg-green100 active:text-green",
    disable: defaultDisable,
  },
  point: {
    enable:
      "bg-blue text-gray50 hover:blue200 active:bg-blue100 active:bg-blue",
    disable: defaultDisable,
  },
  critical: {
    enable:
      "bg-red text-gray50 hover:bg-red200 active:bg-red100 active:text-red",
    disable: defaultDisable,
  },
};

export const Button = ({
  className,
  radius = "normal",
  kind = "text",
  onClick,
  children,
  disabled = false,
  width,
}: PropsType) => {
  const { enable, disable } = buttonColor[kind];
  const borderRadius = radius === "circle" ? "100px" : "2px";
  const widthValue = width ? `w-[${width}px]` : "w-full";
  console.log(widthValue);
  return (
    <button
      className={
        `w-auto box-border pl-[18px] pr-[18px] px-[18px] h-[46px] text-body8 flex items-center gap-x-[15px] rounded-[${borderRadius}] ${
          disabled ? disable : enable
        } ${widthValue}` + className
      }
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
