import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
      assets: path.resolve(__dirname, "./src/assets"),
      pages: path.resolve(__dirname, "./src/App/pages"),
      api: path.resolve(__dirname, "./src/api"),
      styles: path.resolve(__dirname, "./src/styles"),
    },
  },
});
