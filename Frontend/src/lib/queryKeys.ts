export const QUERY_KEYS = {
  packages: ['packages'] as const,
  package: (id: string) => ['packages', id] as const,
  bookings: ['bookings'] as const,
  booking: (id: string) => ['bookings', id] as const,
  profile: ['profile'] as const,
  adminStats: ['admin', 'stats'] as const,
  adminUsers: (page: number, search: string, status: string) =>
    ['admin', 'users', page, search, status] as const,
  adminUser: (id: string) => ['admin', 'users', id] as const,
  adminBookings: (page: number, status: string) =>
    ['admin', 'bookings', page, status] as const,
  adminBooking: (id: string) => ['admin', 'bookings', id] as const,
  adminPackages: ['admin', 'packages'] as const,
}
