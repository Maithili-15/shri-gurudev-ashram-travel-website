import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Loader2, CheckCircle2 } from 'lucide-react'
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
    <div className="min-h-screen flex items-center justify-center bg-surface px-4 py-16 font-body-md text-on-surface">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <img
            src="/assets/Ashram vector logo_2022_white-01.png"
            alt="Shri Gurudev Ashram Logo"
            className="w-14 h-14 object-contain mx-auto mb-4 drop-shadow-sm"
          />
          <h1 className="font-display-lg text-3xl text-primary mb-2">Reset Password</h1>
          <p className="text-on-surface-variant">Enter your email to receive a reset link</p>
        </div>

        <div className="p-8 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
          {sent ? (
            <div className="text-center space-y-4">
              <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto" />
              <p className="text-on-surface font-bold text-lg">Check your email</p>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                We've sent a reset link to <strong className="text-primary">{email}</strong>. Valid for 1 hour.
              </p>
              <Link to="/login" className="inline-block mt-4 text-primary font-bold hover:text-secondary underline decoration-2 underline-offset-4 transition-colors">
                Back to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-5 py-4 rounded-xl bg-surface border border-outline-variant/50 text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
              {error && (
                <div className="px-5 py-4 rounded-xl bg-error-container text-on-error-container text-sm font-medium">
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-primary text-on-primary font-bold hover:bg-primary/90 transition-all disabled:opacity-60 shadow-md"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Send Reset Link'}
              </button>
              <p className="text-center text-on-surface-variant mt-6">
                Remember it?{' '}
                <Link to="/login" className="text-primary hover:text-secondary font-bold transition-colors">Sign In</Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
