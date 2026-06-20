import { NavLink, useNavigate } from 'react-router-dom'
import { Home, BookOpen, Map, User, ShieldCheck, LogOut, AlertTriangle } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

const navItems = [
  { to: '/portal', label: 'Home', icon: Home, end: true },
  { to: '/portal/bookings', label: 'My Bookings', icon: BookOpen, end: false },
  { to: '/yatras', label: 'Browse Yatras', icon: Map, end: false },
  { to: '/portal/profile', label: 'My Profile', icon: User, end: false },
  { to: '/portal/verify', label: 'Verify Identity', icon: ShieldCheck, end: false },
]

const statusConfig = {
  not_submitted: { label: 'Not Verified', className: 'bg-gray-500/20 text-gray-400 border-gray-500/30' },
  submitted: { label: 'Under Review', className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  verified: { label: 'Verified', className: 'bg-green-500/20 text-green-400 border-green-500/30' },
  rejected: { label: 'Rejected', className: 'bg-red-500/20 text-red-400 border-red-500/30' },
}

export function PortalSidebar() {
  const { userProfile, signOut } = useAuth()
  const navigate = useNavigate()

  const verStatus = userProfile?.verification_status ?? 'not_submitted'
  const status = statusConfig[verStatus] ?? statusConfig.not_submitted

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
          <span className="font-display text-sm font-bold text-gradient-saffron truncate">
            Shri Gurudev Ashram
          </span>
        </div>
      </div>

      {/* Verification warning banner */}
      {(verStatus === 'not_submitted' || verStatus === 'rejected') && (
        <NavLink
          to="/portal/verify"
          className="mx-3 mt-3 flex items-start gap-2 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20 hover:bg-orange-500/15 transition-colors"
        >
          <AlertTriangle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-orange-300 leading-snug">
            {verStatus === 'rejected'
              ? 'Verification rejected. Resubmit to book Yatras.'
              : 'Verify your identity to book Yatras'}
          </p>
        </NavLink>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
                  : 'text-[#f2f0eb]/60 hover:text-[#f2f0eb] hover:bg-white/5'
              }`
            }
          >
            <item.icon className="h-4 w-4 flex-shrink-0" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* User info + sign out */}
      <div className="p-3 border-t border-amber-900/20">
        <div className="flex items-center gap-3 p-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {(userProfile?.full_name ?? userProfile?.email ?? 'U').charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#f2f0eb] truncate">
              {userProfile?.full_name ?? 'User'}
            </p>
            <span className={`inline-block text-xs px-2 py-0.5 rounded-full border ${status.className}`}>
              {status.label}
            </span>
          </div>
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
