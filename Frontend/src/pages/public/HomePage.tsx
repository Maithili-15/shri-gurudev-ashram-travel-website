import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, Star, Heart, ArrowRight, ChevronRight } from 'lucide-react'
import { usePackages } from '@/hooks/usePackages'
import { PackageCard } from '@/components/public/PackageCard'
import { LoadingState } from '@/components/shared/States'
import { usePageTitle } from '@/hooks/usePageTitle'

const stats = [
  { value: '5000+', label: 'Devotees Served' },
  { value: '50+', label: 'Yatras Completed' },
  { value: '20+', label: 'Years of Seva' },
  { value: '15+', label: 'Sacred Destinations' },
]

const features = [
  {
    icon: ShieldCheck,
    title: 'Expert Spiritual Guidance',
    desc: 'Every Yatra is personally guided by experienced sevaks under Shri Gurudev\'s blessings.',
  },
  {
    icon: Star,
    title: 'Complete Arrangements',
    desc: 'Transport, accommodation, prasad, and all logistics handled end-to-end.',
  },
  {
    icon: Heart,
    title: 'Divine Community',
    desc: 'Travel alongside thousands of like-minded devotees on the path of bhakti.',
  },
]

const testimonials = [
  {
    name: 'Meena Sharma',
    city: 'Pune',
    quote: 'The Char Dham Yatra with Gurudev Ashram was a transformative experience. Every detail was arranged with such love and care.',
    initial: 'M',
  },
  {
    name: 'Rajesh Patel',
    city: 'Ahmedabad',
    quote: 'I have done 3 Yatras with this Ashram. The spiritual atmosphere they create is unmatched. Highly recommended.',
    initial: 'R',
  },
  {
    name: 'Sunita Desai',
    city: 'Mumbai',
    quote: 'From Kashi to Rameswaram, the journey was blessed. Gurudev\'s presence made every moment sacred.',
    initial: 'S',
  },
]

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.5 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <p className="text-3xl font-bold text-gradient-saffron font-display">{value}</p>
      <p className="text-sm text-[#f2f0eb]/60 mt-1">{label}</p>
    </div>
  )
}

export function HomePage() {
  usePageTitle('Home')
  const { data: packages, isLoading } = usePackages()
  const topPackages = (packages ?? []).slice(0, 3)

  return (
    <div className="overflow-hidden">
      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0908] via-amber-950/20 to-[#0a0908]" />
        <div className="absolute inset-0 grid-pattern opacity-40" />

        {/* Decorative glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-orange-500/6 rounded-full blur-[100px] pointer-events-none" />

        {/* Floating lotus decoration */}
        <div className="absolute top-20 right-10 text-6xl opacity-10 animate-pulse">🪷</div>
        <div className="absolute bottom-24 left-10 text-5xl opacity-8 animate-pulse delay-1000">☸️</div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 py-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-8">
            <span>🙏</span> Jai Shri Gurudev
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6">
            <span className="text-[#f2f0eb]">Embark on a</span>
            <br />
            <span className="text-gradient-saffron">Sacred Journey</span>
          </h1>

          <p className="text-lg sm:text-xl text-[#f2f0eb]/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            Join thousands of devotees on divine Yatras guided by Shri Gurudev.
            Experience the transformative power of sacred pilgrimage.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/yatras"
              className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold hover:from-amber-600 hover:to-orange-700 transition-all shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_40px_rgba(245,158,11,0.5)]"
            >
              View Upcoming Yatras
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/signup"
              className="flex items-center gap-2 px-8 py-4 rounded-xl border border-amber-500/30 text-amber-400 font-semibold hover:bg-amber-500/10 transition-all"
            >
              Register Now
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
          <div className="w-px h-8 bg-gradient-to-b from-amber-500/50 to-transparent" />
        </div>
      </section>

      {/* ── Stats ───────────────────────────────────────────────────── */}
      <section className="py-16 border-y border-amber-900/20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <AnimatedStat key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Upcoming Yatras ─────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-amber-400 text-sm font-medium mb-2 uppercase tracking-wider">
                Sacred Journeys
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#f2f0eb]">
                Upcoming Yatras
              </h2>
            </div>
            <Link
              to="/yatras"
              className="hidden sm:flex items-center gap-1 text-sm text-amber-400 hover:text-amber-300 font-medium transition-colors"
            >
              View all <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {isLoading ? (
            <LoadingState variant="cards" count={3} />
          ) : topPackages.length === 0 ? (
            <div className="text-center py-16 text-[#f2f0eb]/40">
              <p className="text-lg">No upcoming Yatras at the moment.</p>
              <p className="text-sm mt-2">Check back soon for new journeys.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topPackages.map((pkg) => (
                <PackageCard key={pkg.id} package={pkg} />
              ))}
            </div>
          )}

          <div className="mt-8 text-center sm:hidden">
            <Link
              to="/yatras"
              className="inline-flex items-center gap-1 text-sm text-amber-400 hover:text-amber-300 font-medium"
            >
              View all Yatras <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ───────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-[#0d0c0b]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-amber-400 text-sm font-medium mb-2 uppercase tracking-wider">Why Travel With Us</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#f2f0eb]">
              The Ashram Difference
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-2xl bg-[#121110] border border-amber-900/20 hover:border-amber-500/30 transition-all hover:shadow-[0_10px_40px_rgba(245,158,11,0.08)] group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-5 group-hover:bg-amber-500/20 transition-colors">
                  <f.icon className="h-6 w-6 text-amber-400" />
                </div>
                <h3 className="font-semibold text-[#f2f0eb] mb-3">{f.title}</h3>
                <p className="text-sm text-[#f2f0eb]/50 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-amber-400 text-sm font-medium mb-2 uppercase tracking-wider">Devotee Stories</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#f2f0eb]">
              What Devotees Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="p-6 rounded-2xl bg-[#121110] border border-amber-900/20"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {t.initial}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#f2f0eb]">{t.name}</p>
                    <p className="text-xs text-[#f2f0eb]/40">{t.city}</p>
                  </div>
                </div>
                <p className="text-sm text-[#f2f0eb]/60 leading-relaxed italic">"{t.quote}"</p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-10 rounded-3xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent border border-amber-500/20">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#f2f0eb] mb-4">
              Begin Your Sacred Journey Today
            </h2>
            <p className="text-[#f2f0eb]/60 mb-8 leading-relaxed">
              Register for free, complete your identity verification, and join our
              community of devotees on the path of pilgrimage.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold hover:from-amber-600 hover:to-orange-700 transition-all shadow-[0_0_30px_rgba(245,158,11,0.3)]"
            >
              🙏 Register Free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
