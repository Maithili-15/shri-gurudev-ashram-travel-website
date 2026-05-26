import type { ActivityItem, Notification, StatMetric, Transaction, User } from '@/types'

export const dashboardStats: StatMetric[] = [
  { label: 'Total Travelers', value: '2,847', change: 12.4, trend: 'up' },
  { label: 'Revenue (MTD)', value: '₹48.2L', change: 8.2, trend: 'up' },
  { label: 'Active Bookings', value: '186', change: -2.1, trend: 'down' },
  { label: 'Completion Rate', value: '94.2%', change: 1.8, trend: 'up' },
]

export const recentUsers: User[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    role: 'viewer',
    status: 'active',
    joinedAt: '2026-05-24T10:00:00Z',
    trips: 2,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
  },
  {
    id: '2',
    name: 'Arjun Mehta',
    email: 'arjun@example.com',
    role: 'viewer',
    status: 'active',
    joinedAt: '2026-05-23T14:30:00Z',
    trips: 1,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun',
  },
  {
    id: '3',
    name: 'Lakshmi Devi',
    email: 'lakshmi@example.com',
    role: 'viewer',
    status: 'pending',
    joinedAt: '2026-05-22T09:15:00Z',
    trips: 0,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lakshmi',
  },
  {
    id: '4',
    name: 'Rohan Patel',
    email: 'rohan@example.com',
    role: 'viewer',
    status: 'active',
    joinedAt: '2026-05-21T16:45:00Z',
    trips: 3,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan',
  },
  {
    id: '5',
    name: 'Ananya Iyer',
    email: 'ananya@example.com',
    role: 'viewer',
    status: 'inactive',
    joinedAt: '2026-05-20T11:20:00Z',
    trips: 1,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya',
  },
]

export const allUsers: User[] = [
  ...recentUsers,
  {
    id: '6',
    name: 'Vikram Singh',
    email: 'vikram@example.com',
    role: 'coordinator',
    status: 'active',
    joinedAt: '2026-05-18T08:00:00Z',
    trips: 0,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram',
  },
  {
    id: '7',
    name: 'Meera Krishnan',
    email: 'meera@example.com',
    role: 'viewer',
    status: 'active',
    joinedAt: '2026-05-17T12:30:00Z',
    trips: 4,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Meera',
  },
  {
    id: '8',
    name: 'Dev Admin',
    email: 'admin@ashram.dev',
    role: 'admin',
    status: 'active',
    joinedAt: '2026-01-01T00:00:00Z',
    trips: 0,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
  },
]

export const recentActivity: ActivityItem[] = [
  {
    id: '1',
    type: 'booking',
    title: 'New pilgrimage booking',
    description: 'Kashi Yatra — 12 travelers confirmed',
    timestamp: '2026-05-26T08:30:00Z',
    user: 'Priya Sharma',
  },
  {
    id: '2',
    type: 'payment',
    title: 'Payment received',
    description: '₹1,24,000 via UPI — Transaction #TX-8842',
    timestamp: '2026-05-26T07:15:00Z',
  },
  {
    id: '3',
    type: 'user',
    title: 'New traveler registered',
    description: 'Lakshmi Devi completed onboarding',
    timestamp: '2026-05-25T22:40:00Z',
    user: 'Lakshmi Devi',
  },
  {
    id: '4',
    type: 'system',
    title: 'Weekly report generated',
    description: 'Analytics digest sent to coordinators',
    timestamp: '2026-05-25T18:00:00Z',
  },
  {
    id: '5',
    type: 'booking',
    title: 'Booking modified',
    description: 'Rishikesh Retreat dates updated',
    timestamp: '2026-05-25T14:20:00Z',
    user: 'Arjun Mehta',
  },
]

export const transactions: Transaction[] = [
  {
    id: 'TX-8842',
    traveler: 'Priya Sharma',
    package: 'Kashi Yatra Premium',
    amount: 124000,
    status: 'completed',
    date: '2026-05-26T07:15:00Z',
  },
  {
    id: 'TX-8841',
    traveler: 'Rohan Patel',
    package: 'Rishikesh Retreat',
    amount: 45000,
    status: 'pending',
    date: '2026-05-25T16:30:00Z',
  },
  {
    id: 'TX-8840',
    traveler: 'Meera Krishnan',
    package: 'Char Dham Circuit',
    amount: 285000,
    status: 'completed',
    date: '2026-05-25T11:00:00Z',
  },
  {
    id: 'TX-8839',
    traveler: 'Ananya Iyer',
    package: 'Varanasi Spiritual Walk',
    amount: 18500,
    status: 'refunded',
    date: '2026-05-24T09:45:00Z',
  },
  {
    id: 'TX-8838',
    traveler: 'Arjun Mehta',
    package: 'Himalayan Meditation',
    amount: 72000,
    status: 'completed',
    date: '2026-05-23T14:20:00Z',
  },
  {
    id: 'TX-8837',
    traveler: 'Vikram Singh',
    package: 'Group Coordinator Fee',
    amount: 0,
    status: 'failed',
    date: '2026-05-22T10:00:00Z',
  },
]

export const notifications: Notification[] = [
  {
    id: '1',
    title: 'New booking alert',
    message: '12 seats confirmed for Kashi Yatra — May batch',
    read: false,
    timestamp: '2026-05-26T08:30:00Z',
    type: 'success',
  },
  {
    id: '2',
    title: 'Payment pending',
    message: 'Rohan Patel — Rishikesh Retreat awaiting confirmation',
    read: false,
    timestamp: '2026-05-25T16:30:00Z',
    type: 'warning',
  },
  {
    id: '3',
    title: 'System update',
    message: 'Dashboard analytics refreshed for Q2',
    read: true,
    timestamp: '2026-05-25T09:00:00Z',
    type: 'info',
  },
]

/** Chart placeholder data — growth over months */
export const chartData = [
  { month: 'Jan', revenue: 32, travelers: 180 },
  { month: 'Feb', revenue: 38, travelers: 210 },
  { month: 'Mar', revenue: 42, travelers: 245 },
  { month: 'Apr', revenue: 45, travelers: 268 },
  { month: 'May', revenue: 48, travelers: 290 },
  { month: 'Jun', revenue: 52, travelers: 310 },
]

export const analyticsMetrics = [
  { label: 'Page Views', value: '124.5K', change: 18.2 },
  { label: 'Conversion Rate', value: '3.8%', change: 0.4 },
  { label: 'Avg. Session', value: '4m 32s', change: -0.8 },
  { label: 'Bounce Rate', value: '28.4%', change: -2.1 },
]
