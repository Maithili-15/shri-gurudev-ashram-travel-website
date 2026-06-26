import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Loader2, CheckCircle2 } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { usePageTitle } from '@/hooks/usePageTitle'
import { AuthSplitLayout } from '@/components/auth/AuthSplitLayout'

export function ForgotPasswordPage() {
  usePageTitle('Forgot Password')
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const result = await resetPassword(email)
    setLoading(false)
    if (result.error) setError(result.error)
    else setSent(true)
  }

  return (
    <AuthSplitLayout>
      <div className="mb-8 text-center sm:text-left">
        <h2 className="font-display-lg text-3xl sm:text-4xl text-primary font-bold tracking-tight mb-2">
          Reset Password
        </h2>
        <p className="font-body-md text-sm sm:text-base text-on-surface-variant font-light">
          Enter your email to receive a secure reset link.
        </p>
      </div>

      {sent ? (
        <div className="text-center space-y-6 py-6 animate-fade-in-up">
          <div className="w-16 h-16 rounded-full bg-green-600/10 text-green-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h3 className="font-headline-sm text-xl font-bold text-primary">Check your email</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed font-light">
              We've sent a password reset link to <strong className="text-primary font-medium">{email}</strong>. The link is valid for 1 hour.
            </p>
          </div>
          <div className="pt-4">
            <Link
              to="/login"
              className="inline-flex items-center justify-center py-4 px-8 rounded-xl bg-gradient-to-r from-[#E8A338] via-[#C98B1A] to-[#B87314] text-white font-label-caps text-xs tracking-widest uppercase font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              Back to Login
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-secondary mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-5 py-4 rounded-xl bg-[#FAF8F5] border border-outline-variant/50 text-on-surface placeholder:text-outline/70 focus:outline-none focus:border-[#C98B1A] focus:ring-1 focus:ring-[#C98B1A] transition-all shadow-inner text-sm sm:text-base font-light"
            />
          </div>

          {error && (
            <div className="px-5 py-4 rounded-xl bg-error-container/80 border border-error/20 text-on-error-container text-xs sm:text-sm font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2.5 py-4 px-8 rounded-xl bg-gradient-to-r from-[#E8A338] via-[#C98B1A] to-[#B87314] text-white font-label-caps text-xs sm:text-sm tracking-[0.2em] uppercase font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-md active:scale-95"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Send Reset Link'}
          </button>
        </form>
      )}

      <div className="mt-8 pt-6 border-t border-outline-variant/30 text-center sm:text-left">
        <span className="font-body-md text-sm text-on-surface-variant font-light mr-2">
          Remember your password?
        </span>
        <Link
          to="/login"
          className="font-label-caps text-xs tracking-widest uppercase font-bold text-primary hover:text-secondary transition-colors inline-flex items-center gap-1 group"
        >
          Login <span className="transform transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </AuthSplitLayout>
  )
}
