import dayjs from "dayjs"
import { z } from "zod"

export const bookingSchema = z
  .object({
    guestName: z.string().min(2, "Please enter at least 2 characters."),
    startDate: z.string().min(1, "Start date is required."),
    endDate: z.string().min(1, "End date is required."),
    notes: z
      .string()
      .max(200, "Please keep notes under 200 characters.")
      .optional()
      .or(z.literal("")),
  })
  .refine(
    (values) => {
      if (!values.startDate || !values.endDate) return true
      const start = dayjs(values.startDate)
      const end = dayjs(values.endDate)
      if (!start.isValid() || !end.isValid()) return false
      return end.isAfter(start)
    },
    {
      message: "The end date must be later than the start date.",
      path: ["endDate"],
    }
  )


