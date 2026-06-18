import type { TravelPackageRow, BookingRow } from './database.types'

export type TravelPackage = TravelPackageRow
export type Booking = BookingRow

export interface CreateBookingInput {
  packageId: string
  travelerCount: number
  specialNotes?: string
  fullName: string
  phoneNumber: string
  whatsappNumber: string
  dob: string
  address: string
  transportType: 'Flight' | 'Train'
  busType?: 'AC Train' | 'Non-AC Train'
  roomType: 'AC Room' | 'Non-AC Room'
}
