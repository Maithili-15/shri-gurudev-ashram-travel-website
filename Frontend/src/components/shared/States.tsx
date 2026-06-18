import { Loader2, AlertCircle, FileQuestion } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

// ─── LoadingState ─────────────────────────────────────────────────────────────

interface LoadingStateProps {
  variant?: 'cards' | 'table' | 'detail' | 'full-page'
  count?: number
}

export function LoadingState({ variant = 'full-page', count = 3 }: LoadingStateProps) {
  if (variant === 'full-page') {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-amber-500" />
      </div>
    )
  }

  if (variant === 'cards') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="rounded-2xl overflow-hidden animate-pulse">
            <div className="h-48 bg-amber-900/20" />
            <div className="p-5 space-y-3">
              <div className="h-5 bg-amber-900/20 rounded w-3/4" />
              <div className="h-4 bg-amber-900/20 rounded w-1/2" />
              <div className="h-4 bg-amber-900/20 rounded w-1/3" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'table') {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 bg-amber-900/20 rounded-lg animate-pulse" />
        ))}
      </div>
    )
  }

  if (variant === 'detail') {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-amber-900/20 rounded w-1/3" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 bg-amber-900/20 rounded-xl" />
            ))}
          </div>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-16 bg-amber-900/20 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return null
}

// ─── ErrorState ───────────────────────────────────────────────────────────────

interface ErrorStateProps {
  message?: string
  onRetry?: () => void
}

export function ErrorState({ message = 'Something went wrong', onRetry }: ErrorStateProps) {
  return (
    <div className="min-h-[300px] flex flex-col items-center justify-center gap-4 text-center p-8">
      <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
        <AlertCircle className="h-8 w-8 text-red-400" />
      </div>
      <div>
        <p className="text-lg font-semibold text-foreground">Error</p>
        <p className="text-sm text-muted-foreground mt-1">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 rounded-lg bg-amber-500 text-white text-sm font-medium hover:bg-amber-600 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  )
}

// ─── EmptyState ───────────────────────────────────────────────────────────────

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: { label: string; href: string }
}

export function EmptyState({ icon: Icon = FileQuestion, title, description, action }: EmptyStateProps) {
  return (
    <div className="min-h-[300px] flex flex-col items-center justify-center gap-4 text-center p-8">
      <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center">
        <Icon className="h-8 w-8 text-amber-400" />
      </div>
      <div>
        <p className="text-lg font-semibold text-foreground">{title}</p>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      {action && (
        <a
          href={action.href}
          className="px-4 py-2 rounded-lg bg-amber-500 text-white text-sm font-medium hover:bg-amber-600 transition-colors"
        >
          {action.label}
        </a>
      )}
    </div>
  )
}
