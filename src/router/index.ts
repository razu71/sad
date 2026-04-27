import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'AdminDashboard' },
    },
    {
      path: '/auth',
      component: AuthLayout,
      meta: { title: 'Auth' },
      children: [
        {
          path: '',
          redirect: '/auth/login',
        },
        {
          path: 'login',
          name: 'AuthLogin',
          component: () => import('@/pages/auth/LoginPage.vue'),
          meta: { title: 'Sign in' },
        },
      ],
    },
    {
      path: '/admin',
      component: AdminLayout,
      meta: { title: 'Admin' },
      children: [
        {
          path: '',
          name: 'Admin',
          redirect: { name: 'AdminDashboard' },
        },
        {
          path: 'dashboard',
          name: 'AdminDashboard',
          component: () => import('@/pages/admin/DashboardPage.vue'),
          meta: { title: 'Dashboard' },
        },
        {
          path: 'users',
          name: 'AdminUsers',
          component: () => import('@/pages/admin/DashboardPage.vue'),
          meta: { title: 'Users' },
        },
      ],
    },
  ],
})

export default router
