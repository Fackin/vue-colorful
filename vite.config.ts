import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from "vite-plugin-dts";
import { resolve } from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), dts({ // 配置插件
    insertTypesEntry: true, // 生成类型声明文件
    include: ['src'], // 指定源码目录
  })],
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'VueColorfull',
      fileName: 'vue-colorfull', // 输出的文件名
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
