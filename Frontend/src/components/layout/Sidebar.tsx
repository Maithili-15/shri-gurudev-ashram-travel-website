import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Users,
  BarChart3,
  CreditCard,
  Settings,
  X,
  Sparkles,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { APP_NAME, APP_TAGLINE, NAV_ITEMS } from '@/lib/constants'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const iconMap = {
  LayoutDashboard,
  Users,
  BarChart3,
  CreditCard,
  Settings,
} as const

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const { signOut, user } = useAuth()

  const navContent = (
  <>
      <div className="flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/25 glow-saffron">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="font-display text-sm font-semibold tracking-tight">{APP_NAME}</p>
          <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{APP_TAGLINE}</p>
        </div>
      </div>

      <Separator className="my-6 opacity-50" />

      <nav className="flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap]
          return (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="sidebar-active"
                      className="absolute inset-0 rounded-xl bg-primary/10 ring-1 ring-primary/20"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <Icon className="relative z-10 h-4 w-4 shrink-0" />
                  <span className="relative z-10">{item.title}</span>
                </>
              )}
            </NavLink>
          )
        })}
      </nav>

      <div className="mt-auto space-y-3">
        <div className="glass rounded-xl p-3">
          <p className="truncate text-xs font-medium">{user?.name ?? 'Admin'}</p>
          <p className="truncate text-[11px] text-muted-foreground">{user?.email}</p>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-destructive"
          onClick={() => signOut()}
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </div>
    </>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden h-screen w-[260px] shrink-0 flex-col border-r border-border bg-card/50 p-5 md:flex">
        {navContent}
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="fixed left-0 top-0 z-50 flex h-full w-[280px] flex-col border-r border-border glass-strong p-5 md:hidden"
            >
              <Button variant="ghost" size="icon" className="absolute right-3 top-3" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
              {navContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
