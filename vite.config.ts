import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  base: '/neu-crm/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // Deduplicate shared packages — file: deps (comp-lib-prac) have their own
      // node_modules, so any package present in both must be aliased to neu-CRM's
      // copy to prevent dual-instance hook errors in Vitest's jsdom runner.
      'react': path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      'react/jsx-runtime': path.resolve(__dirname, 'node_modules/react/jsx-runtime'),
      'lucide-react': path.resolve(__dirname, 'node_modules/lucide-react'),
    },
  },
  optimizeDeps: {
    include: ['@practics/ui'],
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    server: {
      deps: {
        inline: ['@practics/ui', /@radix-ui\//, /react-remove-scroll/, /use-callback-ref/, /use-sidecar/],
      },
    },
  },
})
