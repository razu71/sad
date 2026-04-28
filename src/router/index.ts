import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { useAuthStore } from '@/stores/auth'

const APP_NAME = 'Sad'

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
        {
          path: 'sign-up',
          name: 'AuthSignUp',
          component: () => import('@/pages/auth/SignUpPage.vue'),
          meta: { title: 'Sign up' },
        },
        {
          path: 'forgot-password',
          name: 'AuthForgotPassword',
          component: () => import('@/pages/auth/ForgotPasswordPage.vue'),
          meta: { title: 'Forgot password' },
        },
        {
          path: 'reset-password',
          name: 'AuthResetPassword',
          component: () => import('@/pages/auth/ResetPasswordPage.vue'),
          meta: { title: 'Reset password' },
        },
      ],
    },
    {
      path: '/admin',
      component: AdminLayout,
      meta: { requiresAuth: true, title: 'Admin' },
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
          path: 'saas-dashboard',
          name: 'AdminSaaSDashboard',
          component: () => import('@/pages/admin/SaaSDashboardPage.vue'),
          meta: { title: 'SaaS dashboard' },
        },
        {
          path: 'fintech-dashboard',
          name: 'AdminFintechDashboard',
          component: () => import('@/pages/admin/FintechDashboardPage.vue'),
          meta: { title: 'Fintech' },
        },
        {
          path: 'healthcare-dashboard',
          name: 'AdminHealthcareDashboard',
          component: () => import('@/pages/admin/HealthcareDashboardPage.vue'),
          meta: { title: 'Healthcare' },
        },
        {
          path: 'fleet-tracking',
          name: 'AdminFleetTracking',
          component: () => import('@/pages/admin/FleetTrackingDashboardPage.vue'),
          meta: { title: 'Fleet tracking' },
        },
        {
          path: 'users',
          name: 'AdminUsers',
          component: () => import('@/pages/admin/UsersPage.vue'),
          meta: { title: 'Users' },
        },
        {
          path: 'settings',
          name: 'AdminSettings',
          component: () => import('@/pages/admin/SettingsPage.vue'),
          meta: { title: 'Settings' },
        },
        {
          path: 'ui',
          name: 'AdminUiPlayground',
          component: () => import('@/pages/admin/UiPlaygroundPage.vue'),
          meta: { title: 'UI playground' },
        },
        {
          path: ':pathMatch(.*)*',
          name: 'AdminNotFound',
          component: () => import('@/pages/errors/NotFoundPage.vue'),
          meta: { title: 'Not found' },
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/pages/errors/NotFoundPage.vue'),
      meta: { title: 'Not found' },
    },
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth === true)

  if (requiresAuth && !auth.isAuthenticated) {
    return {
      name: 'AuthLogin',
      query: { redirect: to.fullPath },
    }
  }

  if (to.path.startsWith('/auth') && auth.isAuthenticated) {
    return { name: 'AdminDashboard' }
  }

  return true
})

router.afterEach((to) => {
  const piece = typeof to.meta.title === 'string' ? String(to.meta.title) : ''
  document.title = piece ? `${piece} · ${APP_NAME}` : APP_NAME
})

export default router
