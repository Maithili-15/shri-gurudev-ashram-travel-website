import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Eye, EyeOff, Loader2, Flower2 } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { usePageTitle } from '@/hooks/usePageTitle'

export function LoginPage() {
  usePageTitle('Sign In')
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: { pathname?: string } })?.from?.pathname ?? '/portal'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const result = await signIn(email, password)
    setLoading(false)
    if (result.error) {
      setError(result.error)
    } else {
      navigate(from, { replace: true })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0908] px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 items-center justify-center mb-4 shadow-[0_0_30px_rgba(245,158,11,0.4)]">
            <Flower2 className="h-7 w-7 text-white" />
          </div>
          <h1 className="font-display text-2xl font-bold text-gradient-saffron">Welcome Back</h1>
          <p className="text-sm text-[#f2f0eb]/50 mt-1">Sign in to your account</p>
        </div>

        <div className="p-8 rounded-3xl bg-[#121110] border border-amber-900/20 sacred-shadow">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-[#f2f0eb]/60 mb-1.5">Email Address</label>
              <input
                id="login-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl bg-[#0a0908] border border-amber-900/30 text-[#f2f0eb] placeholder-[#f2f0eb]/20 focus:outline-none focus:border-amber-500/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-[#f2f0eb]/60 mb-1.5">Password</label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPw ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  className="w-full px-4 py-3 pr-11 rounded-xl bg-[#0a0908] border border-amber-900/30 text-[#f2f0eb] placeholder-[#f2f0eb]/20 focus:outline-none focus:border-amber-500/50 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#f2f0eb]/30 hover:text-[#f2f0eb]/60"
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm text-amber-400 hover:text-amber-300 transition-colors">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              id="login-submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold hover:from-amber-600 hover:to-orange-700 transition-all disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-[#f2f0eb]/40 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-amber-400 hover:text-amber-300 font-medium transition-colors">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
