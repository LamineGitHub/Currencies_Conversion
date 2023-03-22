/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./js/*.js", "*.html"],
  theme: {
    extend: {
      textColor: {
        primary: "var(--primary)",
      },
      backgroundColor: {
        primary: "var(--primary)",
        primaryHover: "var(--primary-hover)",
      },
      colors: {
        primary: "var(--primary)",
      },
      /*   fontFamily: {
        poppins: "Poppins, sans-serif",
      }, */
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
