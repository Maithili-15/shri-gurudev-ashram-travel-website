import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft } from 'lucide-react'
import { QUERY_KEYS } from '@/lib/queryKeys'
import apiClient from '@/lib/apiClient'
import { usePageTitle } from '@/hooks/usePageTitle'
import { LoadingState } from '@/components/shared/States'
import type { BookingRow, UserRow, TravelPackageRow, PaymentRow } from '@/types/database.types'

function InfoRow({ label, value }: { label: string; value?: string | number | null }) {
  if (value === null || value === undefined || value === '') return null
  return (
    <div className="flex gap-4 py-2 border-b border-amber-900/10 last:border-0">
      <span className="w-36 flex-shrink-0 text-sm text-[#f2f0eb]/40">{label}</span>
      <span className="text-sm text-[#f2f0eb]">{String(value)}</span>
    </div>
  )
}

const statusBadge: Record<string, string> = {
  payment_pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  paid: 'bg-green-500/20 text-green-400 border-green-500/30',
  cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
  completed: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
}

export function AdminBookingDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { data, isLoading } = useQuery<{
    booking: BookingRow
    user: UserRow
    package: TravelPackageRow
    payments: PaymentRow[]
  }>({
    queryKey: QUERY_KEYS.adminBooking(id ?? ''),
    queryFn: async () => {
      const { data } = await apiClient.get(`/api/admin/bookings/${id}`)
      return data
    },
    enabled: Boolean(id),
  })

  usePageTitle(data?.booking?.booking_reference ? `Booking #${data.booking.booking_reference}` : 'Booking Detail')

  if (isLoading) return <LoadingState variant="detail" />
  if (!data) return null

  const { booking, user, package: pkg, payments } = data

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg text-[#f2f0eb]/50 hover:text-[#f2f0eb] hover:bg-white/5 transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <h1 className="font-display text-2xl font-bold text-[#f2f0eb]">
          Booking #{booking.booking_reference}
        </h1>
        <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${statusBadge[booking.status] ?? ''}`}>
          {booking.status.replace('_', ' ')}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traveler Info */}
        <div className="p-6 rounded-2xl bg-[#121110] border border-amber-900/20">
          <h2 className="font-semibold text-[#f2f0eb] mb-4">Traveler Information</h2>
          <InfoRow label="Full Name" value={booking.full_name} />
          <InfoRow label="Phone" value={booking.phone_number} />
          <InfoRow label="WhatsApp" value={booking.whatsapp_number} />
          <InfoRow label="Date of Birth" value={booking.dob} />
          <InfoRow label="Address" value={booking.address} />
          <InfoRow label="Travelers" value={booking.traveler_count} />
          <InfoRow label="Special Notes" value={booking.special_notes} />
        </div>

        {/* Package + Travel */}
        <div className="space-y-5">
          <div className="p-6 rounded-2xl bg-[#121110] border border-amber-900/20">
            <h2 className="font-semibold text-[#f2f0eb] mb-4">Package Info</h2>
            <InfoRow label="Package" value={pkg?.title} />
            <InfoRow label="Duration" value={pkg?.duration} />
            <InfoRow label="Price/Person" value={pkg?.price ? `₹${pkg.price.toLocaleString('en-IN')}` : null} />
          </div>
          <div className="p-6 rounded-2xl bg-[#121110] border border-amber-900/20">
            <h2 className="font-semibold text-[#f2f0eb] mb-4">Travel Preferences</h2>
            <InfoRow label="Transport" value={booking.transport_type} />
            <InfoRow label="Train Class" value={booking.bus_type} />
            <InfoRow label="Room Type" value={booking.room_type} />
          </div>
        </div>
      </div>

      {/* User info */}
      {user && (
        <div className="p-6 rounded-2xl bg-[#121110] border border-amber-900/20">
          <h2 className="font-semibold text-[#f2f0eb] mb-4">User Account</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div><span className="text-[#f2f0eb]/40 block mb-0.5">Name</span><span className="text-[#f2f0eb]">{user.full_name}</span></div>
            <div><span className="text-[#f2f0eb]/40 block mb-0.5">Email</span><span className="text-[#f2f0eb]">{user.email ?? '—'}</span></div>
            <div><span className="text-[#f2f0eb]/40 block mb-0.5">Verification</span><span className="capitalize text-[#f2f0eb]">{user.verification_status.replace('_', ' ')}</span></div>
          </div>
        </div>
      )}

      {/* Payments */}
      <div className="p-6 rounded-2xl bg-[#121110] border border-amber-900/20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-[#f2f0eb]">Payment Records</h2>
          <p className="text-lg font-bold text-amber-400">₹{booking.total_amount.toLocaleString('en-IN')}</p>
        </div>
        {payments.length === 0 ? (
          <p className="text-sm text-[#f2f0eb]/40">No payment records yet.</p>
        ) : (
          <div className="space-y-3">
            {payments.map((p) => (
              <div key={p.id} className="p-4 rounded-xl bg-[#0a0908] border border-amber-900/20 text-sm">
                <div className="flex justify-between mb-2">
                  <span className="text-[#f2f0eb]">₹{p.amount.toLocaleString('en-IN')}</span>
                  <span className="text-xs text-[#f2f0eb]/50 capitalize">{p.status}</span>
                </div>
                {p.razorpay_payment_id && (
                  <p className="text-xs text-[#f2f0eb]/40 font-mono">{p.razorpay_payment_id}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
