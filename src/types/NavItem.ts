import type { Component } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

export type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'outline'

export interface NavBadge {
  text: string
  variant: BadgeVariant
}

export interface NavItem {
  label: string
  to?: RouteLocationRaw
  href?: string
  icon: Component
  children?: NavItem[]
  permission?: string | string[]
  featureFlag?: string
  badge?: NavBadge
}
