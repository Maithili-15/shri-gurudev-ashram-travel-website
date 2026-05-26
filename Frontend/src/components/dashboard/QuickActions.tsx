import { motion } from 'framer-motion'
import { Plus, FileText, Send, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const actions = [
  { label: 'New Booking', icon: Plus, variant: 'default' as const },
  { label: 'Export Report', icon: FileText, variant: 'outline' as const },
  { label: 'Send Newsletter', icon: Send, variant: 'outline' as const },
  { label: 'Schedule Event', icon: Calendar, variant: 'outline' as const },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        {actions.map((action, i) => (
          <motion.div
            key={action.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button variant={action.variant} className="h-auto w-full flex-col gap-2 py-4">
              <action.icon className="h-4 w-4" />
              <span className="text-xs">{action.label}</span>
            </Button>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  )
}
