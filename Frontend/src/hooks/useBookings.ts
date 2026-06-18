import { useQuery } from '@tanstack/react-query'
import apiClient from '@/lib/apiClient'
import { QUERY_KEYS } from '@/lib/queryKeys'
import type { Booking } from '@/types/travel'

export function useMyBookings() {
  return useQuery({
    queryKey: QUERY_KEYS.bookings,
    queryFn: async (): Promise<Booking[]> => {
      const { data } = await apiClient.get('/api/bookings')
      return data.bookings ?? []
    },
  })
}

export function useBooking(id: string | undefined) {
  return useQuery({
    queryKey: QUERY_KEYS.booking(id ?? ''),
    queryFn: async () => {
      const { data } = await apiClient.get(`/api/bookings/${id}`)
      return data
    },
    enabled: Boolean(id),
  })
}
