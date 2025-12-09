import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 5173,
    proxy: {
      '/api/*': {
        target: 'http://39.96.69.24',
        changeOrigin: true,
        rewrite: (path) => {
          const newPath = path.replace(/^\/api/, '');
          console.log(`Original path: ${path}, Rewritten path: ${newPath}`);
          return newPath;
        },
        configure: (proxy) => {
          proxy.on('proxyRes', (proxyRes) => {
            proxyRes.headers['Access-Control-Allow-Origin'] = '*';
            proxyRes.headers['Access-Control-Allow-Methods'] = '*';
          });
        }
      }
    }
  }
})
