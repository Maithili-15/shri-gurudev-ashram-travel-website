import type { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  color: string
  onClick?: () => void
}

export function StatsCard({ title, value, icon: Icon, color, onClick }: StatsCardProps) {
  return (
    <div
      onClick={onClick}
      className={`p-6 rounded-2xl bg-[#121110] border border-amber-900/20 hover:border-amber-900/40 transition-all ${onClick ? 'cursor-pointer hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)]' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[#f2f0eb]/50 mb-2">{title}</p>
          <p className="text-3xl font-bold text-[#f2f0eb]">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  )
}
