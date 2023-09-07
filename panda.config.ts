import { theme } from "@/theme/theme";
import { defineConfig } from "@pandacss/dev";

export default defineConfig({
    // Whether to use css reset
    preflight: true,

    // Where to look for your css declarations
    include: ["./src/components/**/*.{ts,tsx,js,jsx}", "./src/app/**/*.{ts,tsx,js,jsx}"],

    // Files to exclude
    exclude: [],

    // Useful for theme customization
    theme: {
        extend: theme,
    },
    optimize: process.env.NODE_ENV === "production",
    minify: process.env.NODE_ENV === "production",
    // The output directory for your css system
    outdir: "styled-system-out",
});