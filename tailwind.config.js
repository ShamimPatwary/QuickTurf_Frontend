/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        qt: {
          green: "#3CA458",
          "green-dark": "#2E8245",
          navy: "#16225C",
          "navy-light": "#243176",
          red: "#D32F2F",
          "red-dark": "#A82424",
          charcoal: "#3A3A3C",
          mist: "#F4F5F7",
          line: "#E3E5EA",
          ink: "#0A0E1F",
          "ink-light": "#101630",
        },
      },
      fontFamily: {
        display: ["Sora", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(22, 34, 92, 0.06), 0 1px 8px 0 rgba(22, 34, 92, 0.06)",
      },
    },
  },
  plugins: [],
};
