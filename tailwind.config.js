/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {},
  },
  plugins: [],
  content: ["./src/**/*.{js,jsx,ts,tsx,html}", "./public/index.html"],
  safelist: [
    {
      pattern: /grid-cols-(3|4|5|6|7|8|9|10|11|12)/,
    }
  ]
};
