import { HeartPulse, Landmark, LayoutDashboard, LayoutPanelLeft, LayoutTemplate, Settings, Tractor, Users } from 'lucide-vue-next'
import type { NavItem } from '@/types/NavItem'

export const nav: NavItem[] = [
  {
    label: 'nav.dashboard',
    to: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'nav.saasDashboard',
    to: '/admin/saas-dashboard',
    icon: LayoutPanelLeft,
  },
  {
    label: 'nav.fintech',
    to: '/admin/fintech-dashboard',
    icon: Landmark,
  },
  {
    label: 'nav.healthcare',
    to: '/admin/healthcare-dashboard',
    icon: HeartPulse,
  },
  {
    label: 'nav.fleet',
    to: '/admin/fleet-tracking',
    icon: Tractor,
  },
  {
    label: 'nav.users',
    to: '/admin/users',
    icon: Users,
  },
  {
    label: 'nav.settings',
    to: '/admin/settings',
    icon: Settings,
  },
  {
    label: 'nav.uiPlayground',
    to: '/admin/ui',
    icon: LayoutTemplate,
  },
]

export const adminNav = nav
