import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { bookingSchema } from "@/schemas/booking"
import type { BookingFormValues } from "@/types/booking"
import type { Booking } from "@/store/useBookingStore"
import { bookingDateUtils, buildDefaultBookingFormValues } from "@/utils/bookingDates"

export const useBookingForm = (selectedBooking: Booking | null) => {
  const form = useForm<BookingFormValues>({
    mode: "onBlur",
    resolver: zodResolver(bookingSchema),
    defaultValues: buildDefaultBookingFormValues(),
  })

  useEffect(() => {
    if (selectedBooking) {
      form.reset({
        guestName: selectedBooking.guestName,
        startDate: bookingDateUtils.toInputValue(selectedBooking.startDate),
        endDate: bookingDateUtils.toInputValue(selectedBooking.endDate),
        notes: selectedBooking.notes ?? "",
      })
    } else {
      form.reset(buildDefaultBookingFormValues())
    }
  }, [selectedBooking, form])

  return form
}


