import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'

const app = createApp(App)

// 使用路由
app.use(router)

// ==================== 开发增强配置 ====================
// 以下配置只在 `npm run dev` 开发模式下生效，生产环境会自动排除
if (process.env.NODE_ENV === 'development') {
  // 1. 启用性能追踪：在浏览器“性能”面板中可看到Vue组件渲染耗时
  app.config.performance = true
  
  // 2. 增强的错误警告：在控制台输出更详细的组件追踪栈
  app.config.warnHandler = (msg, instance, trace) => {
    console.group('[Vue 警告]')
    console.warn('信息:', msg)
    console.warn('组件:', instance)
    console.warn('追踪:', trace)
    console.groupEnd()
  }
  
  // 3. （核心）全局暴露app实例：在浏览器控制台可直接访问
  window.$vueApp = app
  
  console.log('[Vue 开发模式] 增强调试已启用：');
  console.log('• 在控制台直接使用 `$vueApp` 访问应用实例');
  console.log('• 在Elements面板选中Vue组件元素后，在控制台使用 `$0.__vueParentComponent` 访问组件实例（Vue 3）');
  console.log('• 建议安装Vue DevTools浏览器扩展以获得更好的调试体验');
}
// ==================== 配置结束 ====================

app.mount('#app')