import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { usePageTitle } from '@/hooks/usePageTitle'
import { toast } from 'sonner'
import { aboutTempleGate } from '@/assets/images'

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
    <div className="min-h-[100dvh] flex flex-row-reverse font-body-md bg-surface text-on-surface">
      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-16 mt-16 lg:mt-0">
        <div className="w-full max-w-md animate-fade-in-up">
          <div className="mb-10 text-center lg:text-left">
            <span className="font-label-caps text-label-caps text-secondary mb-3 block tracking-widest">BECOME A MEMBER</span>
            <h1 className="font-display-lg text-4xl text-primary mb-3">Join Our Community</h1>
            <p className="text-on-surface-variant text-lg">Register to secure your spot in upcoming Yatras.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { id: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Your full name' },
              { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: '10-digit mobile number' },
              { id: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
            ].map((field) => (
              <div key={field.id}>
                <label className="block text-sm font-medium text-on-surface-variant mb-2">{field.label}</label>
                <input
                  id={`signup-${field.id}`}
                  type={field.type}
                  value={form[field.id as keyof typeof form]}
                  onChange={f(field.id)}
                  placeholder={field.placeholder}
                  className="w-full px-5 py-4 rounded-xl bg-surface-container-lowest border border-outline-variant/50 text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
                {errors[field.id] && (
                  <p className="text-error font-medium text-xs mt-1.5">{errors[field.id]}</p>
                )}
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-2">Password</label>
              <div className="relative">
                <input
                  id="signup-password"
                  type={showPw ? 'text' : 'password'}
                  value={form.password}
                  onChange={f('password')}
                  placeholder="Minimum 6 characters"
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
              {errors.password && <p className="text-error font-medium text-xs mt-1.5">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-2">Confirm Password</label>
              <input
                id="signup-confirm-password"
                type="password"
                value={form.confirmPassword}
                onChange={f('confirmPassword')}
                placeholder="Repeat your password"
                className="w-full px-5 py-4 rounded-xl bg-surface-container-lowest border border-outline-variant/50 text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
              {errors.confirmPassword && (
                <p className="text-error font-medium text-xs mt-1.5">{errors.confirmPassword}</p>
              )}
            </div>

            {errors.form && (
              <div className="px-5 py-4 rounded-xl bg-error-container text-on-error-container text-sm font-medium">
                {errors.form}
              </div>
            )}

            <button
              type="submit"
              id="signup-submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-primary text-on-primary font-bold hover:bg-primary/90 transition-all disabled:opacity-60 shadow-md hover:-translate-y-0.5 mt-6"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Create Account'}
            </button>
          </form>

          <p className="text-center lg:text-left text-on-surface-variant mt-10">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:text-secondary font-bold transition-colors underline decoration-2 underline-offset-4">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Left side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative bg-surface-container overflow-hidden">
        <img 
          src={aboutTempleGate} 
          alt="Temple Gate" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute bottom-16 left-16 right-16 text-white text-center">
          <blockquote className="font-headline-md text-3xl italic leading-relaxed mb-6 text-white drop-shadow-md">
            "Enter these gates not as a tourist, but as a seeker. Every stone here vibrates with the chants of a million devotees."
          </blockquote>
          <cite className="font-label-caps tracking-widest block drop-shadow-md opacity-80">— GURU SHANTI DEVA</cite>
        </div>
      </div>
    </div>
  )
}
