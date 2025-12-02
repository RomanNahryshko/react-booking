import type { Booking } from "@/store/useBookingStore"
import type { BookingFormValues } from "@/types/booking"
import { BookingForm } from "./BookingForm"
import type { UseFormReturn } from "react-hook-form"
import { Button } from "../ui/button"
import { ModalType } from "@/hooks/useBookingModal"

type BookingDialogProps = {
  isOpen: boolean
  mode: ModalType.create | ModalType.edit
  selectedBooking: Booking | null
  form: UseFormReturn<BookingFormValues>
  onSubmit: () => void
  onClose: () => void
}

export function BookingDialog({
  isOpen,
  mode,
  selectedBooking,
  form,
  onSubmit,
  onClose,
}: BookingDialogProps) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl border bg-card p-4 shadow-lg shadow-black/40 sm:p-5"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {mode === ModalType.edit ? "Update booking" : "Create booking"}
            </p>
            <h2 className="text-base font-semibold sm:text-lg">
              {mode === ModalType.edit ? "Edit existing reservation" : "Add a new reservation"}
            </h2>
          </div>
          <Button
            variant={'ghost'}
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
          >
            ×
          </Button>
        </div>

        <BookingForm
          form={form}
          selectedBooking={mode === ModalType.edit ? selectedBooking : null}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  )
}


