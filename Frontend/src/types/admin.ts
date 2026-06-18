import type { UserRow, BookingRow } from './database.types'

export interface AdminStats {
  totalUsers: number
  totalBookings: number
  totalRevenue: number
  pendingVerifications: number
  activePackages: number
}

export type AdminUser = UserRow & { bookingCount: number }

export type AdminBooking = BookingRow & {
  packageTitle: string
  userName: string
}
