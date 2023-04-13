import React from "react";
interface PropsType {
  size?: number;
}
export const WhiteRepoIcon = ({ size = 24 }: PropsType) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <g clip-path="url(#clip0_3244_1371)">
      <path
        d="M-0.285891 24.3787V0.0126953C9.94996 0.0126953 12.1899 0.558442 14.666 4.44287C15.526 5.79216 16.95 7.60223 20.7135 9.98586C24.2798 14.5217 24.078 20.5167 24.078 24.3787H-0.285891Z"
        fill="#C5C5C5"
      />
      <path
        d="M22.8 5.12168C13.1826 7.55812 -0.343347 -4.40539 0.00665749 24.0003H18.9896L22.8 5.12168Z"
        fill="#A5A4A4"
      />
      <path
        d="M23.9992 7.71387C14.0825 7.71387 1.19922 16.4634 1.19922 23.9996H23.9992V7.71387Z"
        fill="#F6F6F6"
      />
    </g>
    <defs>
      <clipPath id="clip0_3244_1371">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
