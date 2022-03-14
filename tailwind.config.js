module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./features/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
    outline: ["focus"],
  },
  plugins: [
    // require("@tailwindcss/forms"),
    // require("tailwind-scrollbar"),
    // require("tailwind-scrollbar-hide"),
  ],
};
