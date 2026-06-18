import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2, Flower2 } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { usePageTitle } from '@/hooks/usePageTitle'
import { toast } from 'sonner'

export function SignupPage() {
  usePageTitle('Create Account')
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPw, setShowPw] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.fullName.trim()) e.fullName = 'Full name is required'
    if (!/^\d{10}$/.test(form.phone)) e.phone = 'Phone must be 10 digits'
    if (!form.email.includes('@')) e.email = 'Valid email is required'
    if (form.password.length < 6) e.password = 'Password must be at least 6 characters'
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    setLoading(true)
    const result = await signUp(form.email, form.password, form.fullName, form.phone)
    setLoading(false)
    if (result.error) {
      setErrors({ form: result.error })
    } else {
      toast.success('Account created! Submit your verification to book Yatras. 🙏')
      navigate('/portal')
    }
  }

  const f = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [field]: e.target.value })

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0908] px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 items-center justify-center mb-4 shadow-[0_0_30px_rgba(245,158,11,0.4)]">
            <Flower2 className="h-7 w-7 text-white" />
          </div>
          <h1 className="font-display text-2xl font-bold text-gradient-saffron">Join Our Community</h1>
          <p className="text-sm text-[#f2f0eb]/50 mt-1">Create your devotee account</p>
        </div>

        <div className="p-8 rounded-3xl bg-[#121110] border border-amber-900/20 sacred-shadow">
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { id: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Your full name' },
              { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: '10-digit mobile number' },
              { id: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
            ].map((field) => (
              <div key={field.id}>
                <label className="block text-sm text-[#f2f0eb]/60 mb-1.5">{field.label}</label>
                <input
                  id={`signup-${field.id}`}
                  type={field.type}
                  value={form[field.id as keyof typeof form]}
                  onChange={f(field.id)}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 rounded-xl bg-[#0a0908] border border-amber-900/30 text-[#f2f0eb] placeholder-[#f2f0eb]/20 focus:outline-none focus:border-amber-500/50 transition-colors"
                />
                {errors[field.id] && (
                  <p className="text-red-400 text-xs mt-1">{errors[field.id]}</p>
                )}
              </div>
            ))}

            <div>
              <label className="block text-sm text-[#f2f0eb]/60 mb-1.5">Password</label>
              <div className="relative">
                <input
                  id="signup-password"
                  type={showPw ? 'text' : 'password'}
                  value={form.password}
                  onChange={f('password')}
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
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm text-[#f2f0eb]/60 mb-1.5">Confirm Password</label>
              <input
                id="signup-confirm-password"
                type="password"
                value={form.confirmPassword}
                onChange={f('confirmPassword')}
                placeholder="Repeat your password"
                className="w-full px-4 py-3 rounded-xl bg-[#0a0908] border border-amber-900/30 text-[#f2f0eb] placeholder-[#f2f0eb]/20 focus:outline-none focus:border-amber-500/50 transition-colors"
              />
              {errors.confirmPassword && (
                <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {errors.form && (
              <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {errors.form}
              </div>
            )}

            <button
              type="submit"
              id="signup-submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold hover:from-amber-600 hover:to-orange-700 transition-all disabled:opacity-60 mt-2"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-[#f2f0eb]/40 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-amber-400 hover:text-amber-300 font-medium transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
