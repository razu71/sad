import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { useAuthStore } from '@/stores/auth'

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
      meta: { title: 'meta.auth' },
      children: [
        {
          path: '',
          redirect: '/auth/login',
        },
        {
          path: 'login',
          name: 'AuthLogin',
          component: () => import('@/pages/auth/LoginPage.vue'),
          meta: { title: 'meta.signIn' },
        },
        {
          path: 'sign-up',
          name: 'AuthSignUp',
          component: () => import('@/pages/auth/SignUpPage.vue'),
          meta: { title: 'meta.signUp' },
        },
        {
          path: 'forgot-password',
          name: 'AuthForgotPassword',
          component: () => import('@/pages/auth/ForgotPasswordPage.vue'),
          meta: { title: 'meta.forgotPassword' },
        },
        {
          path: 'reset-password',
          name: 'AuthResetPassword',
          component: () => import('@/pages/auth/ResetPasswordPage.vue'),
          meta: { title: 'meta.resetPassword' },
        },
      ],
    },
    {
      path: '/admin',
      component: AdminLayout,
      meta: { requiresAuth: true, title: 'meta.admin' },
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
          meta: { title: 'meta.dashboard' },
        },
        {
          path: 'saas-dashboard',
          name: 'AdminSaaSDashboard',
          component: () => import('@/pages/admin/SaaSDashboardPage.vue'),
          meta: { title: 'meta.saasDashboard' },
        },
        {
          path: 'fintech-dashboard',
          name: 'AdminFintechDashboard',
          component: () => import('@/pages/admin/FintechDashboardPage.vue'),
          meta: { title: 'meta.fintech' },
        },
        {
          path: 'healthcare-dashboard',
          name: 'AdminHealthcareDashboard',
          component: () => import('@/pages/admin/HealthcareDashboardPage.vue'),
          meta: { title: 'meta.healthcare' },
        },
        {
          path: 'fleet-tracking',
          name: 'AdminFleetTracking',
          component: () => import('@/pages/admin/FleetTrackingDashboardPage.vue'),
          meta: { title: 'meta.fleetTracking' },
        },
        {
          path: 'users',
          name: 'AdminUsers',
          component: () => import('@/pages/admin/UsersPage.vue'),
          meta: { title: 'meta.users' },
        },
        {
          path: 'settings',
          name: 'AdminSettings',
          component: () => import('@/pages/admin/SettingsPage.vue'),
          meta: { title: 'meta.settings' },
        },
        {
          path: 'ui',
          name: 'AdminUiPlayground',
          component: () => import('@/pages/admin/UiPlaygroundPage.vue'),
          meta: { title: 'meta.uiPlayground' },
        },
        {
          path: ':pathMatch(.*)*',
          name: 'AdminNotFound',
          component: () => import('@/pages/errors/NotFoundPage.vue'),
          meta: { title: 'meta.notFound' },
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/pages/errors/NotFoundPage.vue'),
      meta: { title: 'meta.notFound' },
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

export default router
