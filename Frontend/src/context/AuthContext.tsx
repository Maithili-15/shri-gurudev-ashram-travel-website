import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { AuthUser } from '@/types'
import { getSupabase, isDemoAuth } from '@/services/supabase'

const DEMO_SESSION_KEY = 'ashram_demo_session'

interface AuthContextValue {
  user: AuthUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signUp: (email: string, password: string, name: string) => Promise<{ error?: string }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error?: string }>
}

const AuthContext = createContext<AuthContextValue | null>(null)

function loadDemoUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(DEMO_SESSION_KEY)
    return raw ? (JSON.parse(raw) as AuthUser) : null
  } catch {
    return null
  }
}

function saveDemoUser(user: AuthUser | null) {
  if (user) localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(user))
  else localStorage.removeItem(DEMO_SESSION_KEY)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = getSupabase()

    if (isDemoAuth || !supabase) {
      setUser(loadDemoUser())
      setLoading(false)
      return
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email ?? '',
          name: session.user.user_metadata?.name ?? session.user.email?.split('@')[0] ?? 'Admin',
          avatar: session.user.user_metadata?.avatar_url,
        })
      }
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email ?? '',
          name: session.user.user_metadata?.name ?? 'Admin',
          avatar: session.user.user_metadata?.avatar_url,
        })
      } else {
        setUser(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    const supabase = getSupabase()

    if (isDemoAuth || !supabase) {
      if (!email || password.length < 6) {
        return { error: 'Enter a valid email and password (min 6 characters)' }
      }
      const demoUser: AuthUser = {
        id: 'demo-admin',
        email,
        name: email.split('@')[0] ?? 'Admin',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
      }
      saveDemoUser(demoUser)
      setUser(demoUser)
      return {}
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return error ? { error: error.message } : {}
  }, [])

  const signUp = useCallback(async (email: string, password: string, name: string) => {
    const supabase = getSupabase()

    if (isDemoAuth || !supabase) {
      if (!email || password.length < 6 || !name) {
        return { error: 'Fill all fields. Password must be at least 6 characters.' }
      }
      const demoUser: AuthUser = { id: 'demo-new', email, name }
      saveDemoUser(demoUser)
      setUser(demoUser)
      return {}
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    })
    return error ? { error: error.message } : {}
  }, [])

  const signOut = useCallback(async () => {
    const supabase = getSupabase()
    if (isDemoAuth || !supabase) {
      saveDemoUser(null)
      setUser(null)
      return
    }
    await supabase.auth.signOut()
    setUser(null)
  }, [])

  const resetPassword = useCallback(async (email: string) => {
    const supabase = getSupabase()
    if (isDemoAuth || !supabase) {
      if (!email) return { error: 'Enter your email address' }
      return {}
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    })
    return error ? { error: error.message } : {}
  }, [])

  const value = useMemo(
    () => ({ user, loading, signIn, signUp, signOut, resetPassword }),
    [user, loading, signIn, signUp, signOut, resetPassword],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
