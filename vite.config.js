// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

/**
 * Vite config for AaiShopApp (React + Tailwind)
 *
 * - Fast SWC-based transform (plugin-react-swc)
 * - Dev-only lovable-tagger plugin for helpful component labeling
 * - Path aliases to match tsconfig/jsconfig & shadcn aliases
 * - Default dev server on port 8080, accessible on local network
 */

export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
    server: {
      host: "::", // listen on all interfaces (useful for testing on mobile devices)
      port: 8080,
      strictPort: false, // if 8080 taken, pick another port
    },

    // Plugins
    plugins: [
      react(),
      // only run lovable-tagger in dev (keeps production build clean)
      isDev && componentTagger(),
    ].filter(Boolean),

    // Resolve aliases used throughout the project
    resolve: {
      alias: {
        // core
        "@": path.resolve(__dirname, "./src"),

        // helpful short aliases (matches your components.json)
        "components": path.resolve(__dirname, "./src/components"),
        "utils": path.resolve(__dirname, "./src/lib/utils"),
        "ui": path.resolve(__dirname, "./src/components/ui"),
        "lib": path.resolve(__dirname, "./src/lib"),
        "hooks": path.resolve(__dirname, "./src/hooks"),
      },
    },

    // Optimize dependencies (speeds up cold dev start)
    optimizeDeps: {
      include: [
        // add packages that need pre-bundling here (optional)
        // e.g. "lucide-react", "sonner"
      ],
    },

    // Build options
    build: {
      target: "es2020",
      outDir: "dist",
      sourcemap: isDev, // generate sourcemaps in dev
      rollupOptions: {
        // additional Rollup options if needed
      },
    },

    // Preview server (vite preview)
    preview: {
      port: 8080,
      host: "::",
    },

    // Optional: tweak chunk size warning threshold if you want
    // chunkSizeWarningLimit: 2000,
  };
});
