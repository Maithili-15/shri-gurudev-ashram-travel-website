import { motion } from 'framer-motion'
import type { User } from '@/types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const statusVariant = {
  active: 'success' as const,
  inactive: 'secondary' as const,
  pending: 'warning' as const,
}

interface UsersTableProps {
  users: User[]
  compact?: boolean
}

export function UsersTable({ users, compact = false }: UsersTableProps) {
  const display = compact ? users.slice(0, 5) : users

  return (
    <Card className={compact ? '' : 'overflow-hidden'}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{compact ? 'Recent Travelers' : 'All Travelers'}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-6 py-3 font-medium">Traveler</th>
                <th className="px-6 py-3 font-medium">Status</th>
                {!compact && <th className="px-6 py-3 font-medium">Role</th>}
                <th className="px-6 py-3 font-medium text-right">Trips</th>
              </tr>
            </thead>
            <tbody>
              {display.map((user, i) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="border-b border-border/50 transition-colors hover:bg-muted/30 last:border-0"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={statusVariant[user.status]}>{user.status}</Badge>
                  </td>
                  {!compact && (
                    <td className="px-6 py-4 capitalize text-muted-foreground">{user.role}</td>
                  )}
                  <td className="px-6 py-4 text-right font-medium">{user.trips ?? 0}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
