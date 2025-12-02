import type { z } from "zod"

import type { bookingSchema } from "@/schemas/booking"

export type BookingFormValues = z.infer<typeof bookingSchema>


