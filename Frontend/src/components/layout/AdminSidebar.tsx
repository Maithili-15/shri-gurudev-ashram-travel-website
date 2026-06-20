import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  BookOpen,
  Map,
  LogOut,
  Bell,
} from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/context/AuthContext'
import { QUERY_KEYS } from '@/lib/queryKeys'
import apiClient from '@/lib/apiClient'
import type { AdminStats } from '@/types/admin'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/users', label: 'Users', icon: Users, end: false },
  { to: '/admin/verifications', label: 'Verifications', icon: ShieldCheck, end: false },
  { to: '/admin/bookings', label: 'Bookings', icon: BookOpen, end: false },
  { to: '/admin/packages', label: 'Packages', icon: Map, end: false },
]

export function AdminSidebar() {
  const { userProfile, signOut } = useAuth()
  const navigate = useNavigate()

  const { data: stats } = useQuery<AdminStats>({
    queryKey: QUERY_KEYS.adminStats,
    queryFn: async () => {
      const { data } = await apiClient.get('/api/admin/stats')
      return data
    },
    refetchInterval: 60_000,
  })

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-amber-900/20">
        <div className="flex items-center gap-3">
          <img
            src="/assets/Ashram vector logo_2022_white-01.png"
            alt="Shri Gurudev Ashram Logo"
            className="w-8 h-8 object-contain shrink-0 drop-shadow-sm"
          />
          <div className="min-w-0">
            <p className="font-display text-xs font-bold text-gradient-saffron truncate">
              Shri Gurudev Ashram
            </p>
            <p className="text-xs text-[#f2f0eb]/40">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isPending =
            item.label === 'Verifications' && (stats?.pendingVerifications ?? 0) > 0

          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
                    : 'text-[#f2f0eb]/60 hover:text-[#f2f0eb] hover:bg-white/5'
                }`
              }
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              <span className="flex-1">{item.label}</span>
              {isPending && (
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-orange-500 text-white text-xs font-bold">
                  {stats!.pendingVerifications > 9 ? '9+' : stats!.pendingVerifications}
                </span>
              )}
            </NavLink>
          )
        })}
      </nav>

      {/* Admin user + sign out */}
      <div className="p-3 border-t border-amber-900/20">
        <div className="flex items-center gap-3 p-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {(userProfile?.full_name ?? 'A').charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#f2f0eb] truncate">
              {userProfile?.full_name ?? 'Admin'}
            </p>
            <p className="text-xs text-amber-400">Administrator</p>
          </div>
          <Bell className="h-4 w-4 text-[#f2f0eb]/30" />
        </div>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#f2f0eb]/50 hover:text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  )
}
