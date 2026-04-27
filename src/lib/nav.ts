import { LayoutDashboard } from 'lucide-vue-next'
import type { NavItem } from '@/types/NavItem'

export const nav: NavItem[] = [
  {
    label: 'Dashboard',
    to: '/admin/dashboard',
    icon: LayoutDashboard,
  },
]

export const adminNav = nav

