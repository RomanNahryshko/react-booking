// Updated BookingForm with Save & Cancel buttons inside the calendar popover
import { type UseFormReturn } from "react-hook-form";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import type { Booking } from "@/store/useBookingStore";
import type { BookingFormValues } from "@/types/booking";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns/format";
import { Calendar } from "../ui/calendar";
import type { DateRange } from "react-day-picker";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type BookingFormProps = {
  form: UseFormReturn<BookingFormValues>;
  selectedBooking: Booking | null;
  onSubmit: () => void;
};

export function BookingForm({ form, selectedBooking, onSubmit }: BookingFormProps) {
  const {
    register,
    formState: { errors },
  } = form;

  const isMobile = useMediaQuery("(max-width: 768px)");

  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
    if (selectedBooking) {
      return {
        from: new Date(selectedBooking.startDate),
        to: new Date(selectedBooking.endDate),
      };
    }
    return {
      from: new Date(),
      to: new Date(new Date().setDate(new Date().getDate() + 1)),
    };
  });

  const [tempRange, setTempRange] = useState<DateRange | undefined>(dateRange);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (dateRange?.from && dateRange?.to) {
      form.setValue("startDate", dateRange.from.toISOString());
      form.setValue("endDate", dateRange.to.toISOString());
    }
  }, [dateRange, form]);

  const handleSave = () => {
    setDateRange(tempRange);
    setOpen(false);
  };

  const handleCancel = () => {
    setTempRange(dateRange);
    setOpen(false);
  };

  const setRange = (e:React.SetStateAction<DateRange | undefined>) => {
    form.clearErrors("startDate");
    form.clearErrors("endDate");
    setTempRange(e);
  }

  return (
    <section className="rounded-xl bg-card">
      <form
        className="flex flex-col gap-3 sm:gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        noValidate
      >
        <label className="flex flex-col gap-1 text-sm font-medium text-foreground">
          <span>Guest name</span>
          <input
            type="text"
            {...register("guestName")}
            placeholder="Ada Lovelace"
            className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none ring-offset-background transition focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-1"
          />
          {errors.guestName && (
            <p className="text-xs font-normal text-destructive">{errors.guestName.message}</p>
          )}
        </label>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-foreground">Dates</label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="h-10 w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "MMM dd, yyyy")} - {format(dateRange.to, "MMM dd, yyyy")}
                    </>
                  ) : (
                    format(dateRange.from, "MMM dd, yyyy")
                  )
                ) : (
                  <span className="text-muted-foreground">Select date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="z-50 w-auto rounded-lg border bg-popover p-3 shadow-md outline-none"
              align="start"
              sideOffset={4}
            >
              <Calendar
                mode="range"
                defaultMonth={tempRange?.from}
                selected={tempRange}
                onSelect={setRange}
                numberOfMonths={isMobile ? 1 : 2}
                className="rounded-lg"
              />

              <div className="flex justify-end gap-2 mt-3">
                <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
              </div>
            </PopoverContent>
          </Popover>

          {(errors.startDate || errors.endDate) && (
            <p className="text-xs font-normal text-destructive">
              {errors.startDate?.message || errors.endDate?.message}
            </p>
          )}
        </div>

        <label className="flex flex-col gap-1 text-sm font-medium text-foreground">
          <span>Notes (optional)</span>
          <textarea
            rows={3}
            {...register("notes")}
            placeholder="Early check-in, VIP guest..."
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-offset-background transition focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-1"
          />
          {errors.notes && (
            <p className="text-xs font-normal text-destructive">{errors.notes.message}</p>
          )}
        </label>

        <Button type="submit" className="mt-1 w-full sm:w-auto">
          {selectedBooking ? "Save changes" : "Create booking"}
        </Button>
      </form>
    </section>
  );
}
