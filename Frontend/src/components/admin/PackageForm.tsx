import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import type { TravelPackageRow } from '@/types/database.types'

interface PackageFormData {
  title: string
  description: string
  price: number
  duration: string
  total_seats: number
  remaining_seats: number
  image_url: string
  is_active: boolean
}

interface PackageFormProps {
  initialData?: TravelPackageRow
  onSubmit: (data: PackageFormData) => Promise<void>
  submitLabel: string
}

export function PackageForm({ initialData, onSubmit, submitLabel }: PackageFormProps) {
  const [form, setForm] = useState<PackageFormData>({
    title: initialData?.title ?? '',
    description: initialData?.description ?? '',
    price: initialData?.price ?? 0,
    duration: initialData?.duration ?? '',
    total_seats: initialData?.total_seats ?? 1,
    remaining_seats: initialData?.remaining_seats ?? 1,
    image_url: initialData?.image_url ?? '',
    is_active: initialData?.is_active ?? true,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.title.trim()) e.title = 'Required'
    if (form.description.length < 50) e.description = 'Must be at least 50 characters'
    if (form.price <= 0) e.price = 'Must be greater than 0'
    if (!form.duration.trim()) e.duration = 'Required (e.g. "7 Days / 6 Nights")'
    if (form.total_seats < 1) e.total_seats = 'Must be at least 1'
    if (form.remaining_seats > form.total_seats) e.remaining_seats = 'Cannot exceed total seats'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setSubmitting(true)
    try {
      await onSubmit(form)
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl bg-[#0a0908] border ${errors[field] ? 'border-red-500/50' : 'border-amber-900/30'} text-[#f2f0eb] focus:outline-none focus:border-amber-500/50 transition-colors`

  const ErrMsg = ({ f }: { f: string }) =>
    errors[f] ? <p className="text-red-400 text-xs mt-1">{errors[f]}</p> : null

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm text-[#f2f0eb]/60 mb-1.5">Title *</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="e.g. Char Dham Yatra 2025"
          className={inputClass('title')}
        />
        <ErrMsg f="title" />
      </div>

      <div>
        <label className="block text-sm text-[#f2f0eb]/60 mb-1.5">Description * (min 50 chars)</label>
        <textarea
          rows={5}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Detailed description of the Yatra..."
          className={`${inputClass('description')} resize-none`}
        />
        <div className="flex justify-between mt-1">
          <ErrMsg f="description" />
          <span className="text-xs text-[#f2f0eb]/30 ml-auto">{form.description.length} chars</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-[#f2f0eb]/60 mb-1.5">Price (₹) *</label>
          <input
            type="number"
            min={1}
            value={form.price || ''}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
            placeholder="15000"
            className={inputClass('price')}
          />
          <ErrMsg f="price" />
        </div>
        <div>
          <label className="block text-sm text-[#f2f0eb]/60 mb-1.5">Duration *</label>
          <input
            type="text"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
            placeholder="7 Days / 6 Nights"
            className={inputClass('duration')}
          />
          <ErrMsg f="duration" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-[#f2f0eb]/60 mb-1.5">Total Seats *</label>
          <input
            type="number"
            min={1}
            value={form.total_seats || ''}
            onChange={(e) => setForm({ ...form, total_seats: Number(e.target.value) })}
            className={inputClass('total_seats')}
          />
          <ErrMsg f="total_seats" />
        </div>
        <div>
          <label className="block text-sm text-[#f2f0eb]/60 mb-1.5">Remaining Seats *</label>
          <input
            type="number"
            min={0}
            max={form.total_seats}
            value={form.remaining_seats || ''}
            onChange={(e) => setForm({ ...form, remaining_seats: Number(e.target.value) })}
            className={inputClass('remaining_seats')}
          />
          <ErrMsg f="remaining_seats" />
        </div>
      </div>

      <div>
        <label className="block text-sm text-[#f2f0eb]/60 mb-1.5">Image URL (optional)</label>
        <input
          type="url"
          value={form.image_url}
          onChange={(e) => setForm({ ...form, image_url: e.target.value })}
          placeholder="https://images.unsplash.com/..."
          className={inputClass('image_url')}
        />
        {form.image_url && (
          <div className="mt-2 h-24 rounded-lg overflow-hidden">
            <img src={form.image_url} alt="Preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 p-4 rounded-xl bg-[#0a0908] border border-amber-900/20">
        <button
          type="button"
          onClick={() => setForm({ ...form, is_active: !form.is_active })}
          className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${form.is_active ? 'bg-amber-500' : 'bg-[#2a2622]'}`}
        >
          <span
            className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${form.is_active ? 'left-6' : 'left-1'}`}
          />
        </button>
        <div>
          <p className="text-sm text-[#f2f0eb]">Active Package</p>
          <p className="text-xs text-[#f2f0eb]/40">
            {form.is_active ? 'Visible on the public website' : 'Hidden from public listings'}
          </p>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold hover:from-amber-600 hover:to-orange-700 disabled:opacity-60 transition-all"
      >
        {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : submitLabel}
      </button>
    </form>
  )
}
