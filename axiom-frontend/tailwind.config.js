/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./styles/**/*.css"],
    theme: {
        extend: {
            colors: {
                bg: "#020617",
                surface: "rgba(2, 6, 23, 0.7)",
                panel: "rgba(2, 6, 23, 0.3)",
                cyan: "#00F2FF",
                orange: "#FF8C00",
                green: "#00FF9D",
                red: "#FF003C",
                text: "#ffffff",
                muted: "#475569",
            },
            fontFamily: {
                sans: ["var(--font-sans)", "sans-serif"],
                mono: ["var(--font-mono)", "monospace"],
                orbitron: ["var(--font-orbitron)", "sans-serif"],
            },
            boxShadow: {
                'hud': '0 0 15px rgba(0, 242, 255, 0.2)',
                'hud-inset': 'inset 0 0 20px rgba(0, 242, 255, 0.05)',
                'alert': '0 0 15px rgba(255, 0, 60, 0.3)',
            }
        }
    },
    plugins: [],
};
