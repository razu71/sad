import { HeartPulse, Landmark, LayoutDashboard, LayoutPanelLeft, LayoutTemplate, Settings, Tractor, Users } from 'lucide-vue-next'
import type { NavItem } from '@/types/NavItem'

export const nav: NavItem[] = [
  {
    label: 'Dashboard',
    to: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'SaaS dashboard',
    to: '/admin/saas-dashboard',
    icon: LayoutPanelLeft,
  },
  {
    label: 'Fintech',
    to: '/admin/fintech-dashboard',
    icon: Landmark,
  },
  {
    label: 'Healthcare',
    to: '/admin/healthcare-dashboard',
    icon: HeartPulse,
  },
  {
    label: 'Fleet',
    to: '/admin/fleet-tracking',
    icon: Tractor,
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
