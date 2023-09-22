import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import packageJson from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    // alias: [{ find: /^@\/(.+)/, replacement: resolve(__dirname, '$1') }]
    alias: {
      '@': resolve(__dirname),
    }
  },
  plugins: [dts({
    insertTypesEntry: true,
    compilerOptions: {
      declarationMap: true
    },
  }), vue(), vueJsx()],
  build: {
    target: 'es6',
    outDir: './dist',
    sourcemap: true,
    lib: {
      // 设置入口文件（包含我们导出组件的文件）。
      entry: {
        'index': resolve(__dirname, 'src/index.ts'),
        'hooks/index': resolve(__dirname, 'src/hooks/index.ts'),
        'prefabs/index': resolve(__dirname, 'src/prefabs/index.ts')
      },
      // 库的名称。
      name: packageJson.name,
      // 我们正在为 CJS 和 ESM 构建，使用一个函数来自动重命名文件。
      // 例如：my-component-library.esm.js
      // fileName: (format: string, entryName: string) => {
      //   if (entryName === 'main') return `index.${format}.js`
      //   return `${entryName}/index.${format}.js`
      // }
    },
    rollupOptions: {
      // Vue 是由父项目提供的，不要在我们的库中编译 Vue 源代码。
      external: ['vue', 'livekit-client'],
      output: [
        {
          globals: { vue: 'Vue' },
          format: 'cjs',
          entryFileNames: '[name].js',
        },
        {
          globals: { vue: 'Vue' },
          format: 'es',
          entryFileNames: '[name].mjs',
        },
      ]
    }
  }
})
