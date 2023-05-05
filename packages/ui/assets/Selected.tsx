import React from "react";

interface PropsType {
  size?: number;
  onClick?: () => void;
}

export const Selected = ({ size = 24, onClick }: PropsType) => (
  <svg
    width={size}
    onClick={onClick}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
  >
    <circle cx="12" cy="12" r="11" stroke="white" stroke-width="2" />
    <circle cx="12" cy="12" r="8" fill="white" />
  </svg>
);
