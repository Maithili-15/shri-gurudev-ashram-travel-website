import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { AdminSidebar } from './AdminSidebar'

const routeTitles: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/users': 'User Management',
  '/admin/verifications': 'Verification Queue',
  '/admin/bookings': 'Booking Management',
  '/admin/packages': 'Package Management',
  '/admin/packages/new': 'New Package',
}

export function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const title = Object.entries(routeTitles)
    .reverse()
    .find(([key]) => location.pathname.startsWith(key))?.[1] ?? 'Admin'

  return (
    <div className="min-h-screen bg-[#0a0908] flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 flex-shrink-0 border-r border-amber-900/20 fixed inset-y-0 left-0 z-30">
        <AdminSidebar />
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="lg:hidden fixed left-0 top-0 bottom-0 w-60 z-50 border-r border-amber-900/20 bg-[#0a0908]">
            <AdminSidebar />
          </aside>
        </>
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-60 min-h-screen flex flex-col">
        {/* Top header bar */}
        <header className="sticky top-0 z-20 bg-[#0a0908]/95 backdrop-blur-md border-b border-amber-900/20 px-4 sm:px-6 h-14 flex items-center gap-3">
          <button
            className="lg:hidden p-1.5 rounded-lg text-[#f2f0eb]/50 hover:text-[#f2f0eb] hover:bg-white/5 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <h1 className="text-base font-semibold text-[#f2f0eb]">{title}</h1>
        </header>

        {/* Page content */}
        <main className="flex-1 px-4 sm:px-6 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
