import { motion } from 'framer-motion'
import { BookOpen, CreditCard, UserPlus, Settings } from 'lucide-react'
import type { ActivityItem } from '@/types'
import { formatRelativeTime } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const typeIcons = {
  booking: BookOpen,
  payment: CreditCard,
  user: UserPlus,
  system: Settings,
}

interface ActivityFeedProps {
  items: ActivityItem[]
}

export function ActivityFeed({ items }: ActivityFeedProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {items.map((item, i) => {
          const Icon = typeIcons[item.type]
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex gap-3 rounded-lg p-3 transition-colors hover:bg-muted/50"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{item.title}</p>
                <p className="truncate text-xs text-muted-foreground">{item.description}</p>
                <p className="mt-1 text-[10px] text-muted-foreground">
                  {formatRelativeTime(item.timestamp)}
                  {item.user && ` · ${item.user}`}
                </p>
              </div>
            </motion.div>
          )
        })}
      </CardContent>
    </Card>
  )
}
