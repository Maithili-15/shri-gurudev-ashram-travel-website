import { motion } from 'framer-motion'
import { TrendingDown, TrendingUp, Minus } from 'lucide-react'
import type { StatMetric } from '@/types'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'

interface StatCardProps {
  metric: StatMetric
  index?: number
  icon?: React.ReactNode
}

export function StatCard({ metric, index = 0, icon }: StatCardProps) {
  const TrendIcon =
    metric.trend === 'up' ? TrendingUp : metric.trend === 'down' ? TrendingDown : Minus

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
    >
      <Card className="group relative overflow-hidden border-border/80 bg-card/80 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/5 blur-2xl transition-opacity group-hover:opacity-100 opacity-0" />
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {metric.label}
              </p>
              <p className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                {metric.value}
              </p>
            </div>
            {icon && (
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                {icon}
              </div>
            )}
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs">
            <TrendIcon
              className={cn(
                'h-3.5 w-3.5',
                metric.trend === 'up' && 'text-success',
                metric.trend === 'down' && 'text-destructive',
                metric.trend === 'neutral' && 'text-muted-foreground',
              )}
            />
            <span
              className={cn(
                'font-medium',
                metric.trend === 'up' && 'text-success',
                metric.trend === 'down' && 'text-destructive',
              )}
            >
              {metric.change > 0 ? '+' : ''}
              {metric.change}%
            </span>
            <span className="text-muted-foreground">vs last month</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
