import dayjs, { type Dayjs } from "dayjs"

import type { BookingFormValues } from "@/types/booking"
import type { Booking } from "@/store/useBookingStore"

const DATE_INPUT_FORMAT = "YYYY-MM-DDTHH:mm"

export const bookingDateUtils = {
  toInputValue: (value: string | Date | Dayjs | null): string => {
    if (!value) return ""
    const date = dayjs(value)
    return date.isValid() ? date.format(DATE_INPUT_FORMAT) : ""
  },

  toIsoString: (value: string): string => dayjs(value).toISOString(),

  getRoundedTime: (): { start: Dayjs; end: Dayjs } => {
    const now = dayjs().second(0).millisecond(0)
    const remainder = now.minute() % 15
    const start = remainder === 0 ? now : now.add(15 - remainder, "minute")
    const end = start.add(1, "hour")
    return { start, end }
  },
}

export const buildDefaultBookingFormValues = (): BookingFormValues => {
  const { start, end } = bookingDateUtils.getRoundedTime()

  return {
    guestName: "",
    startDate: bookingDateUtils.toInputValue(start),
    endDate: bookingDateUtils.toInputValue(end),
    notes: "",
  }
}

export const normalizeBookingFormData = (
  values: BookingFormValues
): Omit<Booking, "id"> => ({
  guestName: values.guestName.trim(),
  startDate: bookingDateUtils.toIsoString(values.startDate),
  endDate: bookingDateUtils.toIsoString(values.endDate),
  notes: values.notes?.trim() || undefined,
})


