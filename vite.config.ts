import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
    {
      name: 'my-plugin',
      resolveId(id) {
        if (id === 'virtual:my-module') {
          return '\0' + 'virtual:my-module'
        }
      },
      load(id) {
        if (id === '\0' + 'virtual:my-module') {
          return `export const msg = "Hello world"`
        }
      },
    }
  ],
});
