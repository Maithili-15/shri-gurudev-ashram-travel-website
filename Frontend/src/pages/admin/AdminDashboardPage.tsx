import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import {
  Users,
  BookOpen,
  IndianRupee,
  ShieldAlert,
  Map,
  ArrowRight,
} from 'lucide-react'
import { StatsCard } from '@/components/admin/StatsCard'
import { QUERY_KEYS } from '@/lib/queryKeys'
import apiClient from '@/lib/apiClient'
import { usePageTitle } from '@/hooks/usePageTitle'
import { LoadingState } from '@/components/shared/States'
import type { AdminStats, AdminBooking } from '@/types/admin'

const statusStyles: Record<string, string> = {
  payment_pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  paid: 'bg-green-500/20 text-green-400 border-green-500/30',
  cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
  completed: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
}

export function AdminDashboardPage() {
  usePageTitle('Admin Dashboard')
  const navigate = useNavigate()

  const { data: stats, isLoading: statsLoading } = useQuery<AdminStats>({
    queryKey: QUERY_KEYS.adminStats,
    queryFn: async () => {
      const { data } = await apiClient.get('/api/admin/stats')
      return data
    },
    refetchInterval: 30_000,
  })

  const { data: recentData } = useQuery({
    queryKey: QUERY_KEYS.adminBookings(1, ''),
    queryFn: async () => {
      const { data } = await apiClient.get('/api/admin/bookings', { params: { page: 1, limit: 5 } })
      return data
    },
  })

  if (statsLoading) return <LoadingState variant="cards" count={5} />

  return (
    <div className="space-y-8">
      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <StatsCard
          title="Total Users"
          value={stats?.totalUsers ?? 0}
          icon={Users}
          color="bg-blue-500/20 text-blue-400"
          onClick={() => navigate('/admin/users')}
        />
        <StatsCard
          title="Total Bookings"
          value={stats?.totalBookings ?? 0}
          icon={BookOpen}
          color="bg-amber-500/20 text-amber-400"
          onClick={() => navigate('/admin/bookings')}
        />
        <StatsCard
          title="Total Revenue"
          value={`₹${(stats?.totalRevenue ?? 0).toLocaleString('en-IN')}`}
          icon={IndianRupee}
          color="bg-green-500/20 text-green-400"
        />
        <StatsCard
          title="Pending Verifications"
          value={stats?.pendingVerifications ?? 0}
          icon={ShieldAlert}
          color="bg-orange-500/20 text-orange-400"
          onClick={() => navigate('/admin/verifications')}
        />
        <StatsCard
          title="Active Packages"
          value={stats?.activePackages ?? 0}
          icon={Map}
          color="bg-purple-500/20 text-purple-400"
          onClick={() => navigate('/admin/packages')}
        />
      </div>

      {/* Pending verifications alert */}
      {(stats?.pendingVerifications ?? 0) > 0 && (
        <div
          className="flex items-center justify-between p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 cursor-pointer hover:bg-orange-500/15 transition-colors"
          onClick={() => navigate('/admin/verifications')}
        >
          <div className="flex items-center gap-3">
            <ShieldAlert className="h-5 w-5 text-orange-400" />
            <p className="text-sm font-medium text-orange-300">
              {stats!.pendingVerifications} verification{stats!.pendingVerifications === 1 ? '' : 's'} need review
            </p>
          </div>
          <ArrowRight className="h-4 w-4 text-orange-400" />
        </div>
      )}

      {/* Recent bookings */}
      <div className="rounded-2xl bg-[#121110] border border-amber-900/20 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-900/20">
          <h2 className="font-semibold text-[#f2f0eb]">Recent Bookings</h2>
          <button
            onClick={() => navigate('/admin/bookings')}
            className="text-sm text-amber-400 hover:text-amber-300 transition-colors"
          >
            View all →
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-amber-900/10">
                {['Reference', 'User', 'Amount', 'Status', 'Date'].map((h) => (
                  <th key={h} className="text-left px-6 py-3 text-xs font-medium text-[#f2f0eb]/40 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-900/10">
              {(recentData?.bookings ?? []).map((b: AdminBooking) => (
                <tr
                  key={b.id}
                  className="hover:bg-amber-500/5 cursor-pointer transition-colors"
                  onClick={() => navigate(`/admin/bookings/${b.id}`)}
                >
                  <td className="px-6 py-4 font-mono text-xs text-[#f2f0eb]/70">#{b.booking_reference}</td>
                  <td className="px-6 py-4 text-[#f2f0eb]">{b.userName || '—'}</td>
                  <td className="px-6 py-4 text-amber-400">₹{b.total_amount.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full border font-medium ${statusStyles[b.status] ?? ''}`}>
                      {b.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#f2f0eb]/50 text-xs">
                    {new Date(b.created_at).toLocaleDateString('en-IN')}
                  </td>
                </tr>
              ))}
              {!(recentData?.bookings?.length) && (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-[#f2f0eb]/40 text-sm">No bookings yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
