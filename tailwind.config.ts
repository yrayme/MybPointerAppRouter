import type { Config } from "tailwindcss";
const colors = require("tailwindcss/colors");
delete colors['lightBlue'];
delete colors['warmGray'];
delete colors['trueGray'];
delete colors['coolGray'];
delete colors['blueGray'];

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      ssm: "540px",
      sm: "600px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1700px",
    },
    letterSpacing: {
      custom: "1px",
      medium: "0.5px",
      small: "0.1px",
    },
    extend: {
      boxShadow: {},
      width: {
        "180px": "180px",
        "57px": "57px",
      },
      maxWidth: {
        "430px": "430px",
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        colors,
        primary: "var(--color-primary)",
        "primary-light": "var(--color-primary-light)",
        "primary-light-1": "var(--color-primary-light-1)",
        "primary-dark": "var(--color-primary-dark)",
        white: "var(--color-white)",
        black: "var(--color-black)",
        "black-1": "var(--color-black-1)",
        orange: {
          primary: "var(--color-orange)",
        },
        gray: {
          ...colors.gray,
          1: "var(--color-gray)",
          2: "var(--color-light-gray)",
          3: "var(--color-background-gray)",
          4: "var(--color-gray-1)",
          5: "var(--color-gray-2)",
        },
        red: {
          ...colors.red,
          primary: "var(--color-red)",
          light: "var(--color-red-light)",
        },
        blue: {
          ...colors.blue,
          primary: "var(--color-blue)",
        },
        yellow: {
          ...colors.yellow,
          primary: "var(--color-yellow)",
          light: "var(--color-yellow-light)",
        },
        pink: {
          primary: "var(--color-dark-pink)",
        },
        purple: {
          primary: "var(--color-purple)",
        },
        green: {
          light: "var(--color-green-light)",
        }
      },
    },
  },
  plugins: [],
};
export default config;
