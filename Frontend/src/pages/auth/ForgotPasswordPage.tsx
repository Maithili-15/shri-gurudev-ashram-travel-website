import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Loader2, Flower2, CheckCircle2 } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { usePageTitle } from '@/hooks/usePageTitle'

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
    <div className="min-h-screen flex items-center justify-center bg-[#0a0908] px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 items-center justify-center mb-4">
            <Flower2 className="h-7 w-7 text-white" />
          </div>
          <h1 className="font-display text-2xl font-bold text-gradient-saffron">Reset Password</h1>
          <p className="text-sm text-[#f2f0eb]/50 mt-1">Enter your email to receive a reset link</p>
        </div>
        <div className="p-8 rounded-3xl bg-[#121110] border border-amber-900/20">
          {sent ? (
            <div className="text-center space-y-4">
              <CheckCircle2 className="h-12 w-12 text-green-400 mx-auto" />
              <p className="text-[#f2f0eb] font-medium">Check your email</p>
              <p className="text-sm text-[#f2f0eb]/50">
                We've sent a reset link to <strong className="text-[#f2f0eb]/80">{email}</strong>. Valid for 1 hour.
              </p>
              <Link to="/login" className="inline-block text-sm text-amber-400 hover:text-amber-300">
                Back to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm text-[#f2f0eb]/60 mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#0a0908] border border-amber-900/30 text-[#f2f0eb] placeholder-[#f2f0eb]/20 focus:outline-none focus:border-amber-500/50 transition-colors"
                />
              </div>
              {error && (
                <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold disabled:opacity-60"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Send Reset Link'}
              </button>
              <p className="text-center text-sm text-[#f2f0eb]/40">
                Remember it?{' '}
                <Link to="/login" className="text-amber-400 hover:text-amber-300 font-medium">Sign In</Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
