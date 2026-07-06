import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  // Fallback to localhost:3000 if the env variable is missing
  const targetUrl = env.API_URL || `http://localhost:${env.API_PORT || 3000}`;

  return {
    plugins: [
      react(),
      tailwindcss(),
      babel({ presets: [reactCompilerPreset()] }),
    ],
    server: {
      proxy: {
        "/api": {
          target: targetUrl,
          changeOrigin: true,
        },
      },
    },
  };
});
