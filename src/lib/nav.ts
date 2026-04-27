import { LayoutDashboard } from 'lucide-vue-next'
import type { NavItem } from '@/types/NavItem'

export const adminNav: NavItem[] = [
  {
    label: 'Dashboard',
    to: '/admin/dashboard',
    icon: LayoutDashboard,
  },
]

