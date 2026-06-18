import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ShieldCheck } from 'lucide-react'
import { QUERY_KEYS } from '@/lib/queryKeys'
import apiClient from '@/lib/apiClient'
import { usePageTitle } from '@/hooks/usePageTitle'
import { EmptyState, LoadingState } from '@/components/shared/States'
import type { AdminUser } from '@/types/admin'

function VerificationCard({ user }: { user: AdminUser }) {
  return (
    <Link
      to={`/admin/users/${user.id}`}
      className="block p-5 rounded-2xl bg-[#121110] border border-orange-500/20 hover:border-orange-500/40 transition-all hover:shadow-[0_10px_30px_rgba(249,115,22,0.1)]"
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {user.full_name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-[#f2f0eb] truncate">{user.full_name}</p>
          <p className="text-xs text-[#f2f0eb]/50 mt-0.5">{user.email ?? user.phone}</p>
          {user.aadhaar_image_path && (
            <p className="text-xs text-amber-400 mt-1">📄 Aadhaar uploaded</p>
          )}
          <p className="text-xs text-[#f2f0eb]/30 mt-2">
            Submitted {new Date(user.updated_at).toLocaleDateString('en-IN')}
          </p>
        </div>
        <span className="text-xs text-orange-400 flex-shrink-0 font-medium">Review →</span>
      </div>
    </Link>
  )
}

export function AdminVerificationsPage() {
  usePageTitle('Verification Queue')

  const { data, isLoading } = useQuery({
    queryKey: QUERY_KEYS.adminUsers(1, '', 'submitted'),
    queryFn: async () => {
      const { data } = await apiClient.get('/api/admin/users', {
        params: { status: 'submitted', limit: 50, page: 1 },
      })
      return data
    },
  })

  const users: AdminUser[] = data?.users ?? []

  if (isLoading) return <LoadingState variant="cards" count={4} />

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[#f2f0eb]/50">
            {users.length} pending verification{users.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {users.length === 0 ? (
        <EmptyState
          icon={ShieldCheck}
          title="No pending verifications 🎉"
          description="All identity submissions have been reviewed."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((u) => (
            <VerificationCard key={u.id} user={u} />
          ))}
        </div>
      )}
    </div>
  )
}
