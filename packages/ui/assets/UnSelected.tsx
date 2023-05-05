import React from "react";

interface PropsType {
  size?: number;
  onClick?: () => void;
}

export const UnSelected = ({ size = 24, onClick }: PropsType) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    onClick={onClick}
  >
    <circle cx="12" cy="12" r="11" stroke="#818181" stroke-width="2" />
  </svg>
);
