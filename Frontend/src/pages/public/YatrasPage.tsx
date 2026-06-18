import { usePackages } from '@/hooks/usePackages'
import { PackageCard } from '@/components/public/PackageCard'
import { LoadingState, EmptyState } from '@/components/shared/States'
import { usePageTitle } from '@/hooks/usePageTitle'
import { Map } from 'lucide-react'

export function YatrasPage() {
  usePageTitle('Upcoming Yatras')
  const { data: packages, isLoading } = usePackages()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-amber-400 text-sm font-medium mb-3 uppercase tracking-wider">
          Sacred Pilgrimages
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#f2f0eb] mb-4">
          Upcoming Yatras
        </h1>
        <p className="text-[#f2f0eb]/50 max-w-2xl mx-auto leading-relaxed">
          Join us on our upcoming sacred journeys. Each Yatra is carefully arranged to
          provide a deeply spiritual and comfortable experience.
        </p>
      </div>

      {isLoading ? (
        <LoadingState variant="cards" count={6} />
      ) : !packages?.length ? (
        <EmptyState
          icon={Map}
          title="No upcoming Yatras"
          description="We're planning new Yatras. Please check back soon!"
          action={{ label: 'Contact Us', href: '/contact' }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} package={pkg} />
          ))}
        </div>
      )}
    </div>
  )
}
