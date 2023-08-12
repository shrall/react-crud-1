/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "josefin-sans": ["Josefin Sans", "sans-serif"],
      },
      width: {
        "screen-25": "25vw",
        "screen-30": "30vw",
        "screen-35": "35vw",
        "screen-40": "40vw",
        "screen-45": "45vw",
        "screen-50": "50vw",
        "screen-55": "55vw",
        "screen-60": "60vw",
        "screen-65": "65vw",
        "screen-70": "70vw",
        "screen-75": "75vw",
        "screen-80": "80vw",
        "screen-85": "85vw",
        "screen-90": "90vw",
        "screen-95": "95vw",
      },
      height: {
        "screen-25": "25vh",
        "screen-30": "30vh",
        "screen-35": "35vh",
        "screen-40": "40vh",
        "screen-45": "45vh",
        "screen-50": "50vh",
        "screen-55": "55vh",
        "screen-60": "60vh",
        "screen-65": "65vh",
        "screen-70": "70vh",
        "screen-75": "75vh",
        "screen-80": "80vh",
        "screen-85": "85vh",
        "screen-90": "90vh",
        "screen-95": "95vh",
      },
      animation: {
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        shimmer: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    // ...
  ],

};
