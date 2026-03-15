import { type Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", //ora se aggiungi classe 'dark' su tag html o body attivi il darkmode.
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", 
    "./pages/**/*.{js,ts,jsx,tsx}", 
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
        backgroundImage: {
            "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            "gradient-conic":
              "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        }
    },
  },
  plugins: [require ("@tailwindcss/forms")],
};

export default config;