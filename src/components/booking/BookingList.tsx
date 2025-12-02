import { Button } from "@/components/ui/button"
import type { Booking } from "@/store/useBookingStore"
import { BookingCard } from "./BookingCard"

type BookingListProps = {
  bookings: Booking[]
  onEdit: (booking: Booking) => void
  onDelete: (id: string) => void
  onCreateNew: () => void
  onView: (booking: Booking) => void
}

export function BookingList({
  bookings,
  onEdit,
  onDelete,
  onCreateNew,
  onView,
}: BookingListProps) {
  return (
    <section className="rounded-xl border bg-card p-4 shadow-sm shadow-black/5 sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            All bookings
          </p>
          <h2 className="text-base font-semibold sm:text-lg">Upcoming reservations</h2>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border px-4 py-8 text-center">
          <p className="max-w-sm text-sm text-muted-foreground">
            No bookings yet. Add your first reservation to see it listed here.
          </p>
          <Button size="sm" onClick={onCreateNew}>
            Add booking
          </Button>
        </div>
      ) : (
        <ul className="flex list-none flex-col gap-3">
          {bookings.map((booking) => (
            <li key={booking.id}>
              <BookingCard
                booking={booking}
                onEdit={onEdit}
                onDelete={onDelete}
                onView={onView}
                /> 
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}



