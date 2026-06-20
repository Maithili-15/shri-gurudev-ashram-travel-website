import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { usePageTitle } from '@/hooks/usePageTitle'
import { aboutDiya } from '@/assets/images'

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
    <div className="min-h-[100dvh] flex font-body-md bg-surface text-on-surface">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-16 mt-16 lg:mt-0">
        <div className="w-full max-w-md animate-fade-in-up">
          <div className="mb-12 text-center lg:text-left">
            <span className="font-label-caps text-label-caps text-secondary mb-3 block tracking-widest">DEVOTEE PORTAL</span>
            <h1 className="font-display-lg text-4xl text-primary mb-3">Welcome Back</h1>
            <p className="text-on-surface-variant text-lg">Sign in to continue your spiritual journey.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-2">Email Address</label>
              <input
                id="login-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-5 py-4 rounded-xl bg-surface-container-lowest border border-outline-variant/50 text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-on-surface-variant">Password</label>
                <Link to="/forgot-password" className="text-sm text-primary hover:text-secondary font-medium transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPw ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  className="w-full px-5 py-4 pr-12 rounded-xl bg-surface-container-lowest border border-outline-variant/50 text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors"
                >
                  {showPw ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="px-5 py-4 rounded-xl bg-error-container text-on-error-container text-sm font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              id="login-submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-primary text-on-primary font-bold hover:bg-primary/90 transition-all disabled:opacity-60 shadow-md hover:-translate-y-0.5 mt-4"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Sign In'}
            </button>
          </form>

          <p className="text-center lg:text-left text-on-surface-variant mt-10">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:text-secondary font-bold transition-colors underline decoration-2 underline-offset-4">
              Create Account
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative bg-surface-container overflow-hidden">
        <img 
          src={aboutDiya} 
          alt="Sacred Diya" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute bottom-16 left-16 right-16 text-white text-center">
          <blockquote className="font-headline-md text-3xl italic leading-relaxed mb-6 text-white drop-shadow-md">
            "The light you seek is already within you. Awaken it through devotion and silence."
          </blockquote>
          <cite className="font-label-caps tracking-widest block drop-shadow-md opacity-80">— GURU SHANTI DEVA</cite>
        </div>
      </div>
    </div>
  )
}
