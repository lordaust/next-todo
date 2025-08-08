/** @type {import('tailwindcss').Config} */
module.exports = {
  // Tailwind v4 uses automatic content detection
  // and CSS-first configuration via @theme in CSS files
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
