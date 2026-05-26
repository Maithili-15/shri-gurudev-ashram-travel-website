import { useEffect, useState } from 'react'
import { Users, IndianRupee, Activity, TrendingUp } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatCard } from '@/components/dashboard/StatCard'
import { GrowthChart } from '@/components/dashboard/GrowthChart'
import { ActivityFeed } from '@/components/dashboard/ActivityFeed'
import { UsersTable } from '@/components/dashboard/UsersTable'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { dashboardStats, recentActivity, recentUsers } from '@/data/mock'
import { Skeleton } from '@/components/ui/skeleton'

const statIcons = [Users, IndianRupee, Activity, TrendingUp]

export function DashboardPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(t)
  }, [])

  if (loading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-10 w-64" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-36" />
          ))}
        </div>
        <Skeleton className="h-80" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Welcome back. Here's what's happening at the ashram today."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((metric, i) => {
          const Icon = statIcons[i]
          return (
            <StatCard
              key={metric.label}
              metric={metric}
              index={i}
              icon={<Icon className="h-5 w-5" />}
            />
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <GrowthChart />
        <QuickActions />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <UsersTable users={recentUsers} compact />
        </div>
        <ActivityFeed items={recentActivity} />
      </div>
    </div>
  )
}
