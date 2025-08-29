import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.js"],
    globals: true,
    include: ["src/**/*.{test,spec}.{js,jsx,ts,tsx}"],
    css: false,
  },
  esbuild: {
    jsx: "automatic",
  },
});
