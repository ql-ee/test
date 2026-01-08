import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueInspector from 'vite-plugin-vue-inspector'

export default defineConfig({
  plugins: [
    vue(),
    VueInspector({
      toggleKeyCombo: 'ctrl-shift-click'  // ← 就是这里！加了这个参数
    })
  ],
})