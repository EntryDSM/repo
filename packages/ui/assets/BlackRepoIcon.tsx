import React from "react";
interface PropsType {
  size?: number;
  onClick?: () => void;
}
export const BlackRepoIcon = ({ size = 28, onClick }: PropsType) => (
  <svg
    width={size}
    height={size}
    onClick={onClick}
    viewBox="0 0 28 28"
    fill="none"
  >
    <path
      d="M-5.53131e-05 27.0733V0C11.3731 0 13.862 0.606385 16.6131 4.92242C17.5687 6.42163 19.1509 8.43281 23.3326 11.0813C27.2952 16.1211 27.0709 22.7823 27.0709 27.0733H-5.53131e-05Z"
      fill="#818181"
    />
    <path
      d="M25.6507 5.67643C14.9647 8.38358 -0.0641139 -4.9092 0.32478 26.6527H21.417L25.6507 5.67643Z"
      fill="#F6F6F6"
    />
    <path
      d="M26.9837 8.55664C15.9651 8.55664 1.65039 18.2784 1.65039 26.6519H26.9837V8.55664Z"
      fill="#141414"
    />
  </svg>
);
