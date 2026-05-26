import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { APP_NAME, APP_TAGLINE } from '@/lib/constants'

/** Centered auth layout with brand panel — login, register, forgot password */
export function AuthLayout() {
  return (
    <div className="relative flex min-h-screen">
      <div className="pointer-events-none fixed inset-0 grid-pattern opacity-30" />
      <div className="pointer-events-none fixed left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/8 blur-[140px]" />

      {/* Brand panel — hidden on small screens */}
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="relative hidden w-1/2 flex-col justify-between border-r border-border bg-card/30 p-12 lg:flex"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/25">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-display text-xl font-semibold">{APP_NAME}</p>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">{APP_TAGLINE}</p>
          </div>
        </div>

        <blockquote className="max-w-md">
          <p className="font-display text-3xl font-medium leading-snug tracking-tight text-gradient-saffron">
            Manage sacred journeys with clarity and grace.
          </p>
          <footer className="mt-6 text-sm text-muted-foreground">
            — Shri Gurudev Ashram Travel Platform
          </footer>
        </blockquote>

        <p className="text-xs text-muted-foreground">
          Premium admin experience · Dark mode · Secure by Supabase
        </p>
      </motion.aside>

      <div className="flex flex-1 items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-md"
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  )
}
