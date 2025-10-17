import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        hakkimizda: resolve(__dirname, 'src/pages/hakkimizda.html'),
        hizmetler: resolve(__dirname, 'src/pages/hizmetler.html'),
        home: resolve(__dirname, 'src/pages/home.html'),
        iletisim: resolve(__dirname, 'src/pages/iletisim.html')
      }
    }
  }
})
