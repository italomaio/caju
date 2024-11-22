import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import eslintPlugin from "@nabla/vite-plugin-eslint";

// https://vitejs.dev/config/
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), eslintPlugin()],
    server: {
      port: 3001,
    },
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "src"),
      },
    },
    define: {
      "process.env.API_URL": JSON.stringify(env.API_URL),
    },
  };
});
