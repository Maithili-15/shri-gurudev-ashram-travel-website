import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { PackageForm } from '@/components/admin/PackageForm'
import { QUERY_KEYS } from '@/lib/queryKeys'
import apiClient from '@/lib/apiClient'
import { usePageTitle } from '@/hooks/usePageTitle'
import { toast } from 'sonner'

export function AdminNewPackagePage() {
  usePageTitle('New Package')
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const handleCreate = async (formData: Parameters<typeof PackageForm>[0]['onSubmit'] extends (d: infer D) => unknown ? D : never) => {
    try {
      await apiClient.post('/api/admin/packages', formData)
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.adminPackages })
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.packages })
      toast.success('Package created successfully!')
      navigate('/admin/packages')
    } catch {
      toast.error('Failed to create package')
      throw new Error('create failed')
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-bold text-[#f2f0eb] mb-6">Create New Package</h1>
      <div className="p-6 rounded-2xl bg-[#121110] border border-amber-900/20">
        <PackageForm onSubmit={handleCreate} submitLabel="Create Package" />
      </div>
    </div>
  )
}
