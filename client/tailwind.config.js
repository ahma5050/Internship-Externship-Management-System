const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}', // Include flowbite-react content
    'node_modules/flowbite/**/*.{js,jsx,ts,tsx}', // Include base flowbite styles
    flowbite.content() 
  ],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [
    flowbite.plugin(), // Correctly use Flowbite plugin
  
  ],
};
