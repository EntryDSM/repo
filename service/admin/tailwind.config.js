/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/components/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/assets/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      gray900: "#000000",
      gray800: "#141414",
      gray700: "#1B1B1B",
      gray600: "#373737",
      gray500: "#545454",
      gray400: "#818181",
      gray300: "#A5A4A4",
      gray200: "#C5C5C5",
      gray100: "#F6F6F6",
      gray50: "#FFFFFF",
      check: "#04DF00",
      error: "#E84045",
      focus: "#006EFF",
    },
    fontSize: {
      title1: [
        "30px",
        {
          fontWeight: "600",
        },
      ],
      title2: [
        "27px",
        {
          fontWeight: "500",
        },
      ],
      title3: [
        "24px",
        {
          fontWeight: "300",
        },
      ],
      title4: [
        "24px",
        {
          fontWeight: "100",
        },
      ],
      body1: [
        "22px",
        {
          fontWeight: "500",
        },
      ],
      body2: [
        "22px",
        {
          fontWeight: "400",
        },
      ],
      body3: [
        "20px",
        {
          fontWeight: "500",
        },
      ],
      body4: [
        "20px",
        {
          fontWeight: "400",
        },
      ],
      body5: [
        "17px",
        {
          fontWeight: "500",
        },
      ],
      body6: [
        "17px",
        {
          fontWeight: "400",
        },
      ],
      body7: [
        "14px",
        {
          fontWeight: "400",
        },
      ],
      body8: [
        "14px",
        {
          fontWeight: "600",
        },
      ],
    },
  },
  plugins: [],
};
