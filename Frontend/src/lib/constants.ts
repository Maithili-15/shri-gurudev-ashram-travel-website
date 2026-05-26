/** App-wide navigation — single source of truth for sidebar */
export const NAV_ITEMS = [
  { title: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
  { title: 'Travelers', href: '/users', icon: 'Users' },
  { title: 'Analytics', href: '/analytics', icon: 'BarChart3' },
  { title: 'Transactions', href: '/orders', icon: 'CreditCard' },
  { title: 'Settings', href: '/settings', icon: 'Settings' },
] as const

export const APP_NAME = 'Ashram Admin'
export const APP_TAGLINE = 'Spiritual Travel Platform'
