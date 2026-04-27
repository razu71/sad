import { LayoutDashboard, Users } from 'lucide-vue-next'
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
]

export const adminNav = nav

