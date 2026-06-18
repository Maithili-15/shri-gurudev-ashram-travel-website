import { usePageTitle } from '@/hooks/usePageTitle'
import { Flower2, Star, Target, Heart } from 'lucide-react'

const values = [
  { icon: Flower2, title: 'Bhakti (Devotion)', desc: 'Everything we do is rooted in love for the divine and service to devotees.' },
  { icon: Star, title: 'Seva (Service)', desc: 'We serve each pilgrim with the same care and dedication as serving the divine.' },
  { icon: Target, title: 'Discipline', desc: 'Sacred journeys require focus and discipline, which we cultivate in every Yatra.' },
  { icon: Heart, title: 'Community', desc: 'We believe in the power of collective spiritual practice and shared pilgrimage.' },
]

export function AboutPage() {
  usePageTitle('About Us')

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-16">
      {/* Header */}
      <div className="text-center">
        <p className="text-amber-400 text-sm font-medium mb-3 uppercase tracking-wider">Our Story</p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#f2f0eb] mb-6">
          About Shri Gurudev Ashram
        </h1>
        <p className="text-[#f2f0eb]/60 leading-relaxed max-w-2xl mx-auto">
          For over two decades, Shri Gurudev Ashram has been a beacon of spiritual light,
          guiding thousands of devotees on sacred Yatras across India's holiest destinations.
        </p>
      </div>

      {/* Our Story */}
      <div className="p-8 rounded-3xl bg-[#121110] border border-amber-900/20 space-y-4">
        <h2 className="font-display text-2xl font-bold text-[#f2f0eb]">Our Founding Story</h2>
        <p className="text-[#f2f0eb]/60 leading-relaxed">
          The Ashram was founded over two decades ago by Shri Gurudev, a revered spiritual
          teacher who recognized that sacred pilgrimages could transform lives. What began as
          small group journeys to Nashik's holy sites soon grew into a full-scale spiritual
          travel organization, serving devotees from across Maharashtra and beyond.
        </p>
        <p className="text-[#f2f0eb]/60 leading-relaxed">
          Today, we organize regular Yatras to destinations including the Char Dham, Varanasi,
          Tirupati, Rameswaram, Shirdi, and other sacred sites. Every journey is infused with
          Gurudev's spiritual guidance and our team's commitment to making pilgrimage accessible
          to all devotees.
        </p>
      </div>

      {/* Gurudev */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="h-64 md:h-80 rounded-2xl bg-gradient-to-br from-amber-900/30 to-orange-900/20 flex items-center justify-center border border-amber-900/20">
          <div className="text-center">
            <div className="text-6xl mb-4">🙏</div>
            <p className="text-amber-400 font-display font-bold text-xl">Shri Gurudev</p>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-[#f2f0eb]">Our Gurudev</h2>
          <p className="text-[#f2f0eb]/60 leading-relaxed">
            Shri Gurudev is a realized spiritual master who has dedicated his life to
            guiding seekers on the path of bhakti. Known for his compassion, wisdom,
            and deep spiritual insight, he has touched thousands of lives through
            his teachings and sacred journeys.
          </p>
          <p className="text-[#f2f0eb]/60 leading-relaxed">
            His philosophy is simple: the divine can be found in service to others and
            in the act of pilgrimage. Each Yatra organized under his guidance carries
            his blessings and intention for the highest spiritual benefit of all participants.
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="text-center space-y-4">
        <h2 className="font-display text-2xl font-bold text-[#f2f0eb]">Our Mission</h2>
        <p className="text-[#f2f0eb]/60 leading-relaxed max-w-2xl mx-auto">
          To make sacred pilgrimage accessible, safe, and spiritually enriching for every
          devotee, regardless of age or background. We handle all the logistics so you can
          focus entirely on your spiritual journey.
        </p>
      </div>

      {/* Values */}
      <div>
        <h2 className="font-display text-2xl font-bold text-[#f2f0eb] text-center mb-8">Our Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {values.map((v) => (
            <div
              key={v.title}
              className="p-6 rounded-2xl bg-[#121110] border border-amber-900/20 flex gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                <v.icon className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <h3 className="font-semibold text-[#f2f0eb] mb-1">{v.title}</h3>
                <p className="text-sm text-[#f2f0eb]/50 leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
