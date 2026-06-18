import { Router } from 'express'
import { HttpError } from '../errors'
import { AuthenticatedRequest, requireAuth } from '../middleware/auth'
import { requireAdmin } from '../middleware/adminAuth'
import { supabaseAdmin } from '../services/supabaseAdmin'

export const adminRouter = Router()

// All admin routes require auth + admin role
const protect = [requireAuth, requireAdmin]

// ─── GET /api/admin/stats ────────────────────────────────────────────────────
adminRouter.get('/stats', ...protect, async (_req, res, next) => {
  try {
    const [
      { count: totalUsers },
      { count: totalBookings },
      { count: pendingVerifications },
      { count: activePackages },
      revenueResult,
    ] = await Promise.all([
      supabaseAdmin.from('users').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('bookings').select('*', { count: 'exact', head: true }),
      supabaseAdmin
        .from('users')
        .select('*', { count: 'exact', head: true })
        .eq('verification_status', 'submitted'),
      supabaseAdmin
        .from('travel_packages')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true),
      supabaseAdmin
        .from('bookings')
        .select('total_amount')
        .eq('status', 'paid'),
    ])

    const totalRevenue = (revenueResult.data ?? []).reduce(
      (sum: number, b: { total_amount: number }) => sum + (b.total_amount ?? 0),
      0,
    )

    res.json({
      totalUsers: totalUsers ?? 0,
      totalBookings: totalBookings ?? 0,
      totalRevenue,
      pendingVerifications: pendingVerifications ?? 0,
      activePackages: activePackages ?? 0,
    })
  } catch (error) {
    next(error)
  }
})

// ─── GET /api/admin/users ─────────────────────────────────────────────────────
adminRouter.get('/users', ...protect, async (req, res, next) => {
  try {
    const page = Math.max(1, Number(req.query.page ?? 1))
    const limit = Math.min(100, Math.max(1, Number(req.query.limit ?? 20)))
    const search = String(req.query.search ?? '').trim()
    const status = String(req.query.status ?? '').trim()
    const from = (page - 1) * limit
    const to = from + limit - 1

    let query = supabaseAdmin.from('users').select('*', { count: 'exact' })

    if (search) {
      query = query.or(
        `full_name.ilike.%${search}%,phone.ilike.%${search}%,email.ilike.%${search}%`,
      )
    }
    if (status) {
      query = query.eq('verification_status', status)
    }

    const { data: users, error, count } = await query
      .order('created_at', { ascending: false })
      .range(from, to)

    if (error) throw new HttpError(500, error.message)

    // Fetch booking counts for each user
    const userIds = (users ?? []).map((u: { id: string }) => u.id)
    const bookingCounts: Record<string, number> = {}

    if (userIds.length > 0) {
      const { data: bookingData } = await supabaseAdmin
        .from('bookings')
        .select('user_id')
        .in('user_id', userIds)

      ;(bookingData ?? []).forEach((b: { user_id: string }) => {
        bookingCounts[b.user_id] = (bookingCounts[b.user_id] ?? 0) + 1
      })
    }

    const usersWithCount = (users ?? []).map((u: { id: string }) => ({
      ...u,
      bookingCount: bookingCounts[u.id] ?? 0,
    }))

    res.json({ users: usersWithCount, total: count ?? 0, page, limit })
  } catch (error) {
    next(error)
  }
})

// ─── GET /api/admin/users/:id ─────────────────────────────────────────────────
adminRouter.get('/users/:id', ...protect, async (req, res, next) => {
  try {
    const { id } = req.params

    const [userResult, bookingsResult] = await Promise.all([
      supabaseAdmin.from('users').select('*').eq('id', id).single(),
      supabaseAdmin
        .from('bookings')
        .select('*, travel_packages(title)')
        .eq('user_id', id)
        .order('created_at', { ascending: false }),
    ])

    if (userResult.error || !userResult.data) {
      throw new HttpError(404, 'User not found')
    }

    res.json({ user: userResult.data, bookings: bookingsResult.data ?? [] })
  } catch (error) {
    next(error)
  }
})

// ─── PUT /api/admin/users/:id/verification ─────────────────────────────────────
adminRouter.put('/users/:id/verification', ...protect, async (req, res, next) => {
  try {
    const { id } = req.params
    const { status, notes } = req.body as { status: string; notes?: string }

    if (!['verified', 'rejected'].includes(status)) {
      throw new HttpError(400, 'status must be "verified" or "rejected"')
    }

    const updateData: Record<string, string> = { verification_status: status }
    if (notes) updateData.admin_notes = notes

    const { data: user, error } = await supabaseAdmin
      .from('users')
      .update(updateData)
      .eq('id', id)
      .select('*')
      .single()

    if (error || !user) throw new HttpError(500, error?.message ?? 'Update failed')

    res.json({ user })
  } catch (error) {
    next(error)
  }
})

// ─── GET /api/admin/bookings ──────────────────────────────────────────────────
adminRouter.get('/bookings', ...protect, async (req, res, next) => {
  try {
    const page = Math.max(1, Number(req.query.page ?? 1))
    const limit = Math.min(1000, Math.max(1, Number(req.query.limit ?? 20)))
    const status = String(req.query.status ?? '').trim()
    const packageId = String(req.query.packageId ?? '').trim()
    const from = (page - 1) * limit
    const to = from + limit - 1

    let query = supabaseAdmin
      .from('bookings')
      .select('*, users(full_name, email, phone), travel_packages(title)', {
        count: 'exact',
      })

    if (status) query = query.eq('status', status)
    if (packageId) query = query.eq('package_id', packageId)

    const { data: bookings, error, count } = await query
      .order('created_at', { ascending: false })
      .range(from, to)

    if (error) throw new HttpError(500, error.message)

    const flat = (bookings ?? []).map((b: Record<string, unknown>) => ({
      ...b,
      userName: (b.users as { full_name?: string } | null)?.full_name ?? '',
      packageTitle: (b.travel_packages as { title?: string } | null)?.title ?? '',
    }))

    res.json({ bookings: flat, total: count ?? 0, page, limit })
  } catch (error) {
    next(error)
  }
})

// ─── GET /api/admin/bookings/:id ──────────────────────────────────────────────
adminRouter.get('/bookings/:id', ...protect, async (req, res, next) => {
  try {
    const { id } = req.params

    const [bookingResult, paymentsResult] = await Promise.all([
      supabaseAdmin
        .from('bookings')
        .select('*, users(*), travel_packages(*)')
        .eq('id', id)
        .single(),
      supabaseAdmin
        .from('payments')
        .select('*')
        .eq('booking_id', id)
        .order('created_at', { ascending: false }),
    ])

    if (bookingResult.error || !bookingResult.data) {
      throw new HttpError(404, 'Booking not found')
    }

    const booking = bookingResult.data as Record<string, unknown>

    res.json({
      booking: {
        ...booking,
        users: undefined,
        travel_packages: undefined,
      },
      user: booking.users,
      package: booking.travel_packages,
      payments: paymentsResult.data ?? [],
    })
  } catch (error) {
    next(error)
  }
})

// ─── GET /api/admin/packages ──────────────────────────────────────────────────
adminRouter.get('/packages', ...protect, async (_req, res, next) => {
  try {
    const { data: packages, error } = await supabaseAdmin
      .from('travel_packages')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw new HttpError(500, error.message)
    res.json({ packages: packages ?? [] })
  } catch (error) {
    next(error)
  }
})

// ─── GET /api/admin/packages/:id ──────────────────────────────────────────────
adminRouter.get('/packages/:id', ...protect, async (req, res, next) => {
  try {
    const { id } = req.params
    const { data: pkg, error } = await supabaseAdmin
      .from('travel_packages')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !pkg) throw new HttpError(404, 'Package not found')
    res.json({ package: pkg })
  } catch (error) {
    next(error)
  }
})


// ─── POST /api/admin/packages ─────────────────────────────────────────────────
adminRouter.post('/packages', ...protect, async (req, res, next) => {
  try {
    const {
      title,
      description,
      price,
      duration,
      total_seats,
      remaining_seats,
      image_url,
      is_active,
    } = req.body

    if (!title || !description || !price || !duration || !total_seats) {
      throw new HttpError(400, 'Missing required fields')
    }

    const { data: pkg, error } = await supabaseAdmin
      .from('travel_packages')
      .insert({
        title,
        description,
        price: Number(price),
        duration,
        total_seats: Number(total_seats),
        remaining_seats: Number(remaining_seats ?? total_seats),
        image_url: image_url ?? null,
        is_active: is_active !== false,
      })
      .select('*')
      .single()

    if (error || !pkg) throw new HttpError(500, error?.message ?? 'Insert failed')
    res.status(201).json({ package: pkg })
  } catch (error) {
    next(error)
  }
})

// ─── PUT /api/admin/packages/:id ──────────────────────────────────────────────
adminRouter.put('/packages/:id', ...protect, async (req, res, next) => {
  try {
    const { id } = req.params
    const updates = req.body as Record<string, unknown>

    if (updates.price !== undefined) updates.price = Number(updates.price)
    if (updates.total_seats !== undefined)
      updates.total_seats = Number(updates.total_seats)
    if (updates.remaining_seats !== undefined)
      updates.remaining_seats = Number(updates.remaining_seats)

    const { data: pkg, error } = await supabaseAdmin
      .from('travel_packages')
      .update(updates)
      .eq('id', id)
      .select('*')
      .single()

    if (error || !pkg) throw new HttpError(500, error?.message ?? 'Update failed')
    res.json({ package: pkg })
  } catch (error) {
    next(error)
  }
})

// ─── DELETE /api/admin/packages/:id (soft delete — set is_active=false) ───────
adminRouter.delete('/packages/:id', ...protect, async (req, res, next) => {
  try {
    const { id } = req.params

    const { data: pkg, error } = await supabaseAdmin
      .from('travel_packages')
      .update({ is_active: false })
      .eq('id', id)
      .select('*')
      .single()

    if (error || !pkg) throw new HttpError(500, error?.message ?? 'Update failed')
    res.json({ package: pkg })
  } catch (error) {
    next(error)
  }
})
