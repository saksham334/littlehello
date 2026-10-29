// vite.config.js — configures the Vite dev server and build.
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()], // enables JSX + fast refresh (instant updates when you save)

  server: {
    port: 5173,
    // Any request starting with /api is forwarded to the Express server.
    // The browser only ever talks to localhost:5173, so cookies stay "same-site".
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
});