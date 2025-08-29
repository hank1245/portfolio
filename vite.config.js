import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(() => {
  const isTest = process.env.VITEST;
  return {
    plugins: isTest ? [] : [react()],
    base: "/",
  };
});
