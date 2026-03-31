import { defineConfig, loadEnv, transformWithOxc } from "vite";
import react from "@vitejs/plugin-react";

const transformJsxInJs = () => ({
  name: "transform-jsx-in-js",
  enforce: "pre",
  async transform(code, id) {
    if (!id.match(/.*\.js$/)) {
      return null;
    }

    return await transformWithOxc(code, id, {
      lang: "jsx",
    });
  },
});

export default defineConfig(() => {
  return {
    resolve: {
      tsconfigPaths: true,
    },

    plugins: [
      react(),
      transformJsxInJs()
    ],
    server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist', // Output directory for production build
    sourcemap: true, // Generate source maps
  },
  optimizeDeps: {
    rolldownOptions: {

    },
    },
  };
});