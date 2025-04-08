/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,tsx}"], // Include JSX/TSX if you're using React
  theme: {
    extend: {
      colors: {
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        muted: "var(--text-muted)",
        dark: "var(--text-dark)",
        light: "var(--text-light)",
        success: "var(--text-success)",
        error: "var(--text-error)",
        accent: "var(--accent)",
        bgPrimary: "var(--bg-primary)",
        bgLight: "var(--bg-light)",
        bgDark: "var(--bg-dark)",
        borderPrimary: "var(--border-primary)",
        borderDark: "var(--border-dark)",
      },
    },
  },
  plugins: [],
};
