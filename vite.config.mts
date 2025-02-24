import basicSsl from "@vitejs/plugin-basic-ssl";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgrPlugin from "vite-plugin-svgr";
import viteTsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  build: {
    outDir: "build",
  },
  server: {
    proxy: {
      "/api": "https://xxxx.marvintest.vito.be/",
      "/auth-api": "https://xxxx.marvintest.vito.be/",
      "/geoserver": "https://xxxx.marvintest.vito.be/",
      "/files": "https://xxxx.marvintest.vito.be/",
    },
  },
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
    APP_RELEASE_DATE: JSON.stringify(process.env.npm_package_date),
  },
  plugins: [basicSsl(), svgrPlugin(), viteTsconfigPaths(), react()],
});