import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Add this line! Make sure the slashes match exactly.
  base: '/ATS-FRIENDLY-RESUME-ANALYZER/', 
  plugins: [
    react(),
    tailwindcss(),
  ],
})