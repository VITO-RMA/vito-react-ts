import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgrPlugin from "vite-plugin-svgr";

import pkg from "./package.json" with { type: "json" };

export default defineConfig({
  build: {
    outDir: "build",
  },
  server: {
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
    APP_RELEASE_DATE: JSON.stringify(pkg.config?.date ?? ""),
  },
  resolve: { tsconfigPaths: true },
  plugins: [
    {
      name: "html-version",
      transformIndexHtml(html: string) {
        return html.replace("%APP_VERSION%", pkg.version);
      },
    },
    basicSsl(),
    svgrPlugin(),
    tailwindcss(),
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
});
