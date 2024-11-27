/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "350px",
        // => @media (min-width: 350px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "992px",
        // => @media (min-width: 992px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        '2xl': "1536px",
        // => @media (min-width: 1536px) {... }
      },
      boxShadow: {
        'item-product': '0px 4px 8px 0px rgba(92, 107, 192, 0.20), 0px 2px 4px 0px rgba(59, 69, 123, 0.20);',
        'button-option': 'box-shadow: 0px 2px 4px 0px rgba(41, 121, 255, 0.24), 0px 1px 2px 0px rgba(27, 78, 163, 0.24);'
      }
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}

