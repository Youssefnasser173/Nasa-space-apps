/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-main': '#F6F8FC',
        'bg-subtle': '#EDF2F8',
        'card-bg': '#FFFFFF',
        'primary-blue': '#2457D6',
        'bright-blue': '#377DFF',
        'teal-accent': '#13A6A6',
        'coral-accent': '#EE7068',
        'amber-accent': '#E9A33B',
        'violet-accent': '#8064D8',
        'deep-navy': '#1C2D43',
        'primary-text': '#19283A',
        'secondary-text': '#66778D',
        'border-subtle': '#DCE5EF',
        'status-success': '#159B73',
        'status-warning': '#E9A33B',
        'status-critical': '#D65465',
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px rgba(28, 45, 67, 0.05), 0 4px 12px rgba(28, 45, 67, 0.03)',
        'card-hover': '0 4px 12px rgba(36, 87, 214, 0.08), 0 12px 28px rgba(28, 45, 67, 0.08)',
        'elevated': '0 12px 32px rgba(28, 45, 67, 0.1)',
        'glow-blue': '0 0 24px rgba(55, 125, 255, 0.25)',
      }
    },
  },
  plugins: [],
}
