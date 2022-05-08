/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgrPlugin()],
  test: {
    environment: 'jsdom',
    setupFiles: 'src/__tests__/setupTests.ts',
    globals: true,
    mockReset: true,
    clearMocks: true,
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
});
