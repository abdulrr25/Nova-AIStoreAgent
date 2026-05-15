import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      container: { center: true, padding: "15px" },
      colors: {
        accent: "#E84545",
        nova: {
          dark: "#0F0F0F",
          dark2: "#1A1A1A",
          body: "#F5F5F0",
          gray: "#6B7280",
          "gray-light": "#9CA3AF",
          border: "#E5E7EB",
          gold: "#F59E0B",
          green: "#16A34A",
        }
      }
    },
  },
  plugins: [],
};
export default config;
