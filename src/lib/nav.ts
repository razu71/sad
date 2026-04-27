import { LayoutDashboard, LayoutTemplate, Settings, Users } from 'lucide-vue-next'
import type { NavItem } from '@/types/NavItem'

export const nav: NavItem[] = [
  {
    label: 'Dashboard',
    to: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Users',
    to: '/admin/users',
    icon: Users,
  },
  {
    label: 'Settings',
    to: '/admin/settings',
    icon: Settings,
  },
  {
    label: 'UI playground',
    to: '/admin/ui',
    icon: LayoutTemplate,
  },
]

export const adminNav = nav
