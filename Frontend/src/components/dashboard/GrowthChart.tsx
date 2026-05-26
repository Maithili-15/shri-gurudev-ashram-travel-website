import { motion } from 'framer-motion'
import { chartData } from '@/data/mock'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

/** SVG area chart placeholder — swap with Recharts/Chart.js when backend is ready */
export function GrowthChart() {
  const maxRevenue = Math.max(...chartData.map((d) => d.revenue))
  const points = chartData
    .map((d, i) => {
      const x = (i / (chartData.length - 1)) * 100
      const y = 100 - (d.revenue / maxRevenue) * 80
      return `${x},${y}`
    })
    .join(' ')

  const areaPath = `M0,100 L0,${100 - (chartData[0].revenue / maxRevenue) * 80} ${chartData
    .map((d, i) => {
      const x = (i / (chartData.length - 1)) * 100
      const y = 100 - (d.revenue / maxRevenue) * 80
      return `L${x},${y}`
    })
    .join(' ')} L100,100 Z`

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle>Growth Overview</CardTitle>
        <CardDescription>Revenue & traveler trends — last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative h-[220px] w-full">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffb77d" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#ffb77d" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path
              d={areaPath}
              fill="url(#chartGradient)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
            <motion.polyline
              fill="none"
              stroke="#ffb77d"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
          </svg>
          <div className="mt-4 flex justify-between text-xs text-muted-foreground">
            {chartData.map((d) => (
              <span key={d.month}>{d.month}</span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
