import dayjs from "dayjs"

import type { Booking } from "@/store/useBookingStore"
import { Button } from "../ui/button"

type BookingDetailsDialogProps = {
  booking: Booking | null
  isOpen: boolean
  onClose: () => void
  onEdit: (booking: Booking) => void
}

export function BookingDetailsDialog({ booking, isOpen, onClose, onEdit }: BookingDetailsDialogProps) {
  if (!isOpen || !booking) return null

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl border bg-card p-5 shadow-xl shadow-black/40"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Booking details
            </p>
            <h2 className="text-xl font-semibold">{booking.guestName}</h2>
          </div>
          <Button
            variant={'ghost'}
            type="button"
            onClick={onClose}
            aria-label="Close details dialog"
          >
            ×
          </Button>
        </div>

        <dl className="space-y-3 text-sm">
          <div className="rounded-lg border px-3 py-2">
            <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Starts
            </dt>
            <dd>{dayjs(booking.startDate).format("dddd, MMMM D, YYYY h:mm A")}</dd>
          </div>
          <div className="rounded-lg border px-3 py-2">
            <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Ends
            </dt>
            <dd>{dayjs(booking.endDate).format("dddd, MMMM D, YYYY h:mm A")}</dd>
          </div>
          {booking.notes && (
            <div className="rounded-lg border px-3 py-2">
              <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Notes
              </dt>
              <dd className="text-sm">{booking.notes}</dd>
            </div>
          )}
        </dl>

        <div className="mt-5 flex flex-wrap justify-end gap-2">
          <Button
            variant={'secondary'}
            type="button"
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            type="button"
            variant={'default'}
            onClick={() => {
              onClose()
              onEdit(booking)
            }}
          >
            Edit booking
          </Button>
        </div>
      </div>
    </div>
  )
}


