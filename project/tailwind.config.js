/** @type {import('tailwindcss').Config} */
module. exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      spacing: {
        'calc-100-minus-50': 'calc(100% - 50px)',
      },
    },
    fontFamily:{
      Kaushan:["Kaushan Script"]
    },
  },
  plugins: [],
};
