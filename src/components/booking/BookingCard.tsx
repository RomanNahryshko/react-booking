import dayjs from "dayjs"
import { Pencil, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { Booking } from "@/store/useBookingStore"

type BookingCardProps = {
  booking: Booking
  onEdit: (booking: Booking) => void
  onDelete: (id: string) => void
  onView: (booking: Booking) => void
}

export const BookingCard = ({ booking, onEdit, onDelete, onView }: BookingCardProps) => {
  return (
    <div
      className="cursor-pointer rounded-lg border border-border px-3 py-3 text-sm transition-colors hover:border-ring sm:px-4 sm:py-3.5"
      onClick={() => onView(booking)}
    >
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="font-semibold">{booking.guestName}</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Button
            size="icon-sm"
            variant="outline"
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              onEdit(booking)
            }}
            aria-label="Edit booking"
          >
            <Pencil className="size-4" />
          </Button>
          <Button
            size="icon-sm"
            variant="destructive"
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              onDelete(booking.id)
            }}
            aria-label="Delete booking"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        {dayjs(booking.startDate).format("MMM D, YYYY h:mm A")} -{" "}
        {dayjs(booking.endDate).format("MMM D, YYYY h:mm A")}
      </p>
      {booking.notes && (
        <p className="mt-1 text-xs italic text-muted-foreground">{booking.notes}</p>
      )}
    </div>
  )
}