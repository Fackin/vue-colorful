import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from "vite-plugin-dts";
import { resolve } from 'node:path';
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), cssInjectedByJsPlugin(), dts({ // 配置插件
    insertTypesEntry: true, // 生成类型声明文件
    include: ['src'], // 指定源码目录
    // copyDtsFiles: true, // ✅ 确保 `.d.ts` 文件正确复制
    outDir: 'dist', // 输出目录
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
  css: {
    postcss: {
      plugins: [],
    },
  },
})
