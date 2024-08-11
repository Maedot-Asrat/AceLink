import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1', // Bind to an IPv4 address
    port: 5000,        // Use port 3000 or any other port you prefer
  },
});
