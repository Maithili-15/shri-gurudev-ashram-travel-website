import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { QUERY_KEYS } from '@/lib/queryKeys'
import type { TravelPackage } from '@/types/travel'

export function usePackages() {
  return useQuery({
    queryKey: QUERY_KEYS.packages,
    queryFn: async (): Promise<TravelPackage[]> => {
      const { data, error } = await supabase
        .from('travel_packages')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
      if (error) throw error
      return (data ?? []) as TravelPackage[]
    },
  })
}

export function usePackage(id: string | undefined) {
  return useQuery({
    queryKey: QUERY_KEYS.package(id ?? ''),
    queryFn: async (): Promise<TravelPackage> => {
      const { data, error } = await supabase
        .from('travel_packages')
        .select('*')
        .eq('id', id)
        .single()
      if (error) throw error
      return data as TravelPackage
    },
    enabled: Boolean(id),
  })
}
