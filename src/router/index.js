import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Admin from '@/views/Admin.vue'
import register from '@/views/register.vue'
import ChangePassword from "@/views/ChangePassword.vue";
import DataDirectory from "@/views/DataDirectory.vue";
import DataQuery from "@/views/DataQuery.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/change-password',
    name: 'ChangePassword',
    component: ChangePassword
  },
  {
    path: '/data-directory',
    name: 'data-directory',
    component: DataDirectory
  },
  {
    path: '/DataQuery',
    name: 'DataQuery',
    component: DataQuery
  },
  // 添加更多的路由...
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router
