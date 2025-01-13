import angular from '@analogjs/vite-plugin-angular';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    hmr: true,
  },
  build: {
    rollupOptions: {
      input: './index.html', // Ensure the index.html is the correct entry point
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test-setup.ts',
    include: ['src/**/*.spec.ts'],
  },
  plugins: [angular()],
});
