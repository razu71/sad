import type { Component } from 'vue'
import { LayoutDashboard } from 'lucide-vue-next'

export type NavItem = {
  label: string
  to: string
  icon?: Component
  children?: NavItem[]
}

export const adminNav: NavItem[] = [
  {
    label: 'Dashboard',
    to: '/admin/dashboard',
    icon: LayoutDashboard,
  },
]

