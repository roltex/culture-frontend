/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          'primary': '#143057',
          'primary-dark': '#143057' // A darker shade for hover/active states
        }
      },
    },
    plugins: [
      require('@tailwindcss/line-clamp')
    ],
  };
  