import { Link } from 'react-router-dom'
import { IndianRupee, Calendar, Users, ArrowRight } from 'lucide-react'
import type { BookingRow } from '@/types/database.types'

type BookingWithTitle = BookingRow & { packageTitle?: string }

const statusConfig = {
  payment_pending: { label: 'Payment Pending', className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  paid: { label: 'Confirmed', className: 'bg-green-500/20 text-green-400 border-green-500/30' },
  cancelled: { label: 'Cancelled', className: 'bg-red-500/20 text-red-400 border-red-500/30' },
  completed: { label: 'Completed', className: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
}

export function BookingCard({ booking }: { booking: BookingWithTitle }) {
  const status = statusConfig[booking.status] ?? statusConfig.payment_pending

  return (
    <div className="p-5 rounded-2xl bg-[#121110] border border-amber-900/20 hover:border-amber-500/20 transition-all">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-[#f2f0eb] truncate">
            {booking.packageTitle ?? 'Yatra Booking'}
          </p>
          <p className="text-xs text-[#f2f0eb]/40 mt-0.5 font-mono">
            #{booking.booking_reference}
          </p>
        </div>
        <span className={`flex-shrink-0 text-xs font-medium px-2.5 py-1 rounded-full border ${status.className}`}>
          {status.label}
        </span>
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-[#f2f0eb]/50 mb-4">
        <span className="flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5 text-amber-500" />
          {booking.traveler_count} traveler{booking.traveler_count !== 1 ? 's' : ''}
        </span>
        <span className="flex items-center gap-1.5">
          <IndianRupee className="h-3.5 w-3.5 text-amber-500" />
          ₹{booking.total_amount.toLocaleString('en-IN')}
        </span>
        <span className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-amber-500" />
          {new Date(booking.created_at).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </span>
      </div>

      <Link
        to={`/portal/bookings/${booking.id}`}
        className="inline-flex items-center gap-1.5 text-sm text-amber-400 hover:text-amber-300 font-medium transition-colors"
      >
        View Details <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  )
}
