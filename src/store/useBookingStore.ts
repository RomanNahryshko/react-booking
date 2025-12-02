import dayjs from "dayjs"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export type Booking = {
  id: string
  guestName: string
  startDate: string
  endDate: string
  notes?: string
}

type BookingInput = Omit<Booking, "id">

type BookingStore = {
  bookings: Booking[]
  selectedId: string | null
  addBooking: (booking: BookingInput) => Booking
  updateBooking: (id: string, updates: BookingInput) => Booking | null
  deleteBooking: (id: string) => void
  selectBooking: (id: string | null) => void
  hasConflict: (booking: BookingInput, ignoreId?: string | null) => boolean
}

const initialBookings: Booking[] = []

const overlaps = (startA: string, endA: string, startB: string, endB: string) => {
  const startTimeA = dayjs(startA).valueOf()
  const endTimeA = dayjs(endA).valueOf()
  const startTimeB = dayjs(startB).valueOf()
  const endTimeB = dayjs(endB).valueOf()

  return startTimeA < endTimeB && startTimeB < endTimeA
}

export const useBookingStore = create<BookingStore>()(
  persist(
    (set, get) => ({
      bookings: initialBookings.sort(
        (a, b) => dayjs(a.startDate).valueOf() - dayjs(b.startDate).valueOf()
      ),
      selectedId: null,
      addBooking: (booking) => {
        const newBooking: Booking = { ...booking, id: crypto.randomUUID() }
        set((state) => ({
          bookings: [...state.bookings, newBooking].sort(
            (a, b) => dayjs(a.startDate).valueOf() - dayjs(b.startDate).valueOf()
          ),
        }))
        return newBooking
      },
      updateBooking: (id, updates) => {
        let updatedBooking: Booking | null = null
        set((state) => {
          const updated = state.bookings.map((booking) => {
            if (booking.id !== id) return booking
            updatedBooking = { ...booking, ...updates }
            return updatedBooking
          })
          return {
            bookings: updated.sort(
              (a, b) => dayjs(a.startDate).valueOf() - dayjs(b.startDate).valueOf()
            ),
          }
        })
        return updatedBooking
      },
      deleteBooking: (id) => {
        set((state) => ({
          bookings: state.bookings.filter((booking) => booking.id !== id),
          selectedId: state.selectedId === id ? null : state.selectedId,
        }))
      },
      selectBooking: (id) => set({ selectedId: id }),
      hasConflict: (booking) => {
        const { bookings } = get()
        return bookings.some(
          (existing) =>
            overlaps(existing.startDate, existing.endDate, booking.startDate, booking.endDate) && existing.id !== get().selectedId
        )
      },
    }),
    {
      name: "booking-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        bookings: state.bookings,
      }),
    }
  )
)