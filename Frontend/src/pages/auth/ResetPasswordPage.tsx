import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2, Flower2 } from 'lucide-react'
import { usePageTitle } from '@/hooks/usePageTitle'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

export function ResetPasswordPage() {
  usePageTitle('Reset Password')
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    const { error: updateError } = await supabase.auth.updateUser({ password })
    setLoading(false)
    if (updateError) {
      setError(updateError.message)
    } else {
      toast.success('Password updated! Please sign in with your new password.')
      navigate('/login')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0908] px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 items-center justify-center mb-4">
            <Flower2 className="h-7 w-7 text-white" />
          </div>
          <h1 className="font-display text-2xl font-bold text-gradient-saffron">New Password</h1>
          <p className="text-sm text-[#f2f0eb]/50 mt-1">Choose a strong new password</p>
        </div>
        <div className="p-8 rounded-3xl bg-[#121110] border border-amber-900/20">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-[#f2f0eb]/60 mb-1.5">New Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
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
            <div>
              <label className="block text-sm text-[#f2f0eb]/60 mb-1.5">Confirm New Password</label>
              <input
                type="password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Repeat new password"
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
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Update Password'}
            </button>
            <p className="text-center text-sm text-[#f2f0eb]/40">
              <Link to="/login" className="text-amber-400 hover:text-amber-300">Back to Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
