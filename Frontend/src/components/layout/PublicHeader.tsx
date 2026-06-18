import { useState, useEffect } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { Flower2, Menu, X, LogIn, UserCircle } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About', end: false },
  { to: '/yatras', label: 'Yatras', end: false },
  { to: '/gallery', label: 'Gallery', end: false },
  { to: '/faq', label: 'FAQ', end: false },
  { to: '/contact', label: 'Contact', end: false },
]

export function PublicHeader() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0908]/95 backdrop-blur-md border-b border-amber-900/20 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Flower2 className="h-5 w-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="font-display text-base font-bold text-gradient-saffron leading-tight">
                Shri Gurudev Ashram
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-amber-400 bg-amber-500/10'
                      : 'text-[#f2f0eb]/70 hover:text-amber-400 hover:bg-amber-500/5'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Auth buttons */}
          <div className="hidden lg:flex items-center gap-2">
            {user ? (
              <button
                onClick={() => navigate('/portal')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 text-white text-sm font-medium hover:bg-amber-600 transition-colors"
              >
                <UserCircle className="h-4 w-4" />
                My Portal
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#f2f0eb]/70 text-sm font-medium hover:text-amber-400 transition-colors"
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="px-4 py-2 rounded-lg bg-amber-500 text-white text-sm font-medium hover:bg-amber-600 transition-colors"
                >
                  Register Free
                </button>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg text-[#f2f0eb]/70 hover:text-amber-400 hover:bg-amber-500/10 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0a0908]/98 backdrop-blur-md border-b border-amber-900/20 px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-amber-400 bg-amber-500/10'
                    : 'text-[#f2f0eb]/70 hover:text-amber-400'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <div className="pt-2 border-t border-amber-900/20 mt-2 flex flex-col gap-2">
            {user ? (
              <button
                onClick={() => { navigate('/portal'); setMobileOpen(false) }}
                className="w-full py-2.5 rounded-lg bg-amber-500 text-white text-sm font-medium"
              >
                My Portal
              </button>
            ) : (
              <>
                <button
                  onClick={() => { navigate('/login'); setMobileOpen(false) }}
                  className="w-full py-2.5 rounded-lg border border-amber-500/30 text-amber-400 text-sm font-medium"
                >
                  Login
                </button>
                <button
                  onClick={() => { navigate('/signup'); setMobileOpen(false) }}
                  className="w-full py-2.5 rounded-lg bg-amber-500 text-white text-sm font-medium"
                >
                  Register Free
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
