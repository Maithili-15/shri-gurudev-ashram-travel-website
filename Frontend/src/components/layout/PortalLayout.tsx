import { Outlet } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { Home, BookOpen, User, ShieldCheck } from 'lucide-react'
import { PortalSidebar } from './PortalSidebar'

const mobileNavItems = [
  { to: '/portal', label: 'Home', icon: Home, end: true },
  { to: '/portal/bookings', label: 'Bookings', icon: BookOpen, end: false },
  { to: '/portal/profile', label: 'Profile', icon: User, end: false },
  { to: '/portal/verify', label: 'Verify', icon: ShieldCheck, end: false },
]

export function PortalLayout() {
  return (
    <div className="min-h-screen bg-[#0a0908] flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 flex-shrink-0 border-r border-amber-900/20 fixed inset-y-0 left-0 z-30">
        <PortalSidebar />
      </aside>

      {/* Main content */}
      <main className="flex-1 lg:ml-60 min-h-screen pb-20 lg:pb-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-[#0a0908]/95 backdrop-blur-md border-t border-amber-900/20">
        <div className="flex">
          {mobileNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex-1 flex flex-col items-center gap-1 py-2.5 text-xs font-medium transition-colors ${
                  isActive ? 'text-amber-400' : 'text-[#f2f0eb]/40'
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
