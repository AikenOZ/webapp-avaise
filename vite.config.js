import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  build: {
    // Минификация
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      }
    },
    
    // Разделение кода
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          mantine: ['@mantine/core', '@mantine/hooks'],
          icons: ['@tabler/icons-react']
        }
      }
    },
    
    // Оптимизация размеров
    chunkSizeWarningLimit: 1000,
    assetsInlineLimit: 4096,
    
    // Убираем sourcemap для продакшена
    sourcemap: false,
    
    // Целевые браузеры
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14']
  },
  
  // Предварительная сборка зависимостей
  optimizeDeps: {
    include: ['react', 'react-dom', '@mantine/core']
  },
  
  // CSS оптимизация
  css: {
    devSourcemap: false
  }
})