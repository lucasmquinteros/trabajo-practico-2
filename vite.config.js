import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        character: resolve(__dirname, "src/pages/character.html"),
        episode: resolve(__dirname, "src/pages/episode.html"),
        episodes: resolve(__dirname, "src/pages/episodes.html"),
        location: resolve(__dirname, "src/pages/location.html"),
        locations: resolve(__dirname, "src/pages/locations.html")
      },
    },
  },
});
