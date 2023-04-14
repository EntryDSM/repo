import { ReactNode } from "react";

interface PropsType {
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
}

const defaultDisable = "bg-gray200 text-gray50";

const buttonColor = {
  contained: {
    enable: "bg-gray800 text-gray50 hover:bg-gray500 active:bg-gray400",
    disable: defaultDisable,
  },
  outline: {
    enable:
      "border-2 text-gray800 hover:text-gray50 hover:bg-gray600 active:text-gray50 active:bg-gray500",
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
  radius = "normal",
  kind = "text",
  onClick,
  children,
  disabled = false,
}: PropsType) => {
  const { enable, disable } = buttonColor[kind];
  const borderRadius = radius === "circle" ? "100px" : "2px";
  return (
    <button
      className={`box-border flex items-center justify-center px-[18px] h-[46px] text-body8 rounded-[${borderRadius}] ${
        disabled ? disable : enable
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
