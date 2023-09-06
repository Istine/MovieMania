/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    // "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      phone: "0px",
      // => @media (min-width: 640px) { ... }

      tablet: "640px",
      // => @media (min-width: 640px) { ... }

      laptop: "1024px",
      // => @media (min-width: 1024px) { ... }

      desktop: "1480px",
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      fontFamily: {
        lato: ['"Lato"'],
        carrois: ['"Carrois Gothic SC"'],
      },
    },
  },
  plugins: [],
};
