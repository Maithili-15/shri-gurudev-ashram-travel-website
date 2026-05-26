import { useState } from 'react'
import { Plus, Search, Users as UsersIcon } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { UsersTable } from '@/components/dashboard/UsersTable'
import { allUsers } from '@/data/mock'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/useDebounce'
import { EmptyState } from '@/components/shared/EmptyState'

export function UsersPage() {
  const [search, setSearch] = useState('')
  const debounced = useDebounce(search)

  const filtered = allUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(debounced.toLowerCase()) ||
      u.email.toLowerCase().includes(debounced.toLowerCase()),
  )

  return (
    <div className="space-y-8">
      <PageHeader
        title="Travelers"
        description="Manage pilgrim profiles, roles, and booking history."
      >
        <Button>
          <Plus className="h-4 w-4" />
          Add Traveler
        </Button>
      </PageHeader>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name or email..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={UsersIcon}
          title="No travelers found"
          description="Try adjusting your search or add a new traveler to get started."
          actionLabel="Add Traveler"
          onAction={() => {}}
        />
      ) : (
        <UsersTable users={filtered} />
      )}
    </div>
  )
}
