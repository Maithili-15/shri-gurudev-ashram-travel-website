import { PageHeader } from '@/components/shared/PageHeader'
import { StatCard } from '@/components/dashboard/StatCard'
import { ChartPlaceholder } from '@/components/dashboard/ChartPlaceholder'
import { analyticsMetrics } from '@/data/mock'
import { Eye, MousePointer, Clock, ArrowDownRight } from 'lucide-react'
import type { StatMetric } from '@/types'

const icons = [Eye, MousePointer, Clock, ArrowDownRight]

const metrics: StatMetric[] = analyticsMetrics.map((m) => ({
  label: m.label,
  value: m.value,
  change: m.change,
  trend: m.change >= 0 ? 'up' : 'down',
}))

export function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Analytics"
        description="Track engagement, conversions, and platform performance."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric, i) => {
          const Icon = icons[i]
          return (
            <StatCard key={metric.label} metric={metric} index={i} icon={<Icon className="h-5 w-5" />} />
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartPlaceholder title="Traffic Sources" description="Organic, direct, referral breakdown" />
        <ChartPlaceholder title="Booking Funnel" description="Views → inquiries → confirmed" />
        <ChartPlaceholder title="Geographic Distribution" description="Travelers by region" className="lg:col-span-2" />
      </div>
    </div>
  )
}
