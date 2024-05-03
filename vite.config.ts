import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:5000
  },
  define: {
    'process.env': process.env,
    global: {},
  },
  // optimizeDeps: {
  //   include: [
  //     '@emotion/react',
  //     '@emotion/styled',
  //     '@mui/material/Tooltip'
  //   ],
  // },
})
