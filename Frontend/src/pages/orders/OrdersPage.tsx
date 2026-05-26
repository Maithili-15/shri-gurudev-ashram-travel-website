import { motion } from 'framer-motion'
import { PageHeader } from '@/components/shared/PageHeader'
import { transactions } from '@/data/mock'
import { formatCurrency, formatRelativeTime } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, Filter } from 'lucide-react'

const statusVariant = {
  completed: 'success' as const,
  pending: 'warning' as const,
  refunded: 'secondary' as const,
  failed: 'destructive' as const,
}

export function OrdersPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Transactions"
        description="Payments, refunds, and booking financial records."
      >
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </PageHeader>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-6 py-3 font-medium">ID</th>
                  <th className="px-6 py-3 font-medium">Traveler</th>
                  <th className="px-6 py-3 font-medium">Package</th>
                  <th className="px-6 py-3 font-medium">Amount</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium text-right">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, i) => (
                  <motion.tr
                    key={tx.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b border-border/50 transition-colors hover:bg-muted/30 last:border-0"
                  >
                    <td className="px-6 py-4 font-mono text-xs text-primary">{tx.id}</td>
                    <td className="px-6 py-4 font-medium">{tx.traveler}</td>
                    <td className="px-6 py-4 text-muted-foreground">{tx.package}</td>
                    <td className="px-6 py-4 font-medium">
                      {tx.amount > 0 ? formatCurrency(tx.amount) : '—'}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={statusVariant[tx.status]}>{tx.status}</Badge>
                    </td>
                    <td className="px-6 py-4 text-right text-muted-foreground">
                      {formatRelativeTime(tx.date)}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
