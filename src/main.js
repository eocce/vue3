import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './assets/styles/global.css';  // 引入全局样式文件
const app = createApp(App)

app.use(store)
app.use(router)
app.mount('#app')

// 将 axios 添加到 Vue 实例的原型链上，这样在组件中可以通过 this.$axios 来访问
app.config.globalProperties.$axios = axios
