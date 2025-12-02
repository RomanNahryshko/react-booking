import { useState } from "react"
import { BookingDialog } from "@/components/booking/BookingDialog"
import { BookingDetailsDialog } from "@/components/booking/BookingDetailsDialog"
import { BookingList } from "@/components/booking/BookingList"
import { ConfirmationDialog } from "@/components/common/ConfirmationDialog"
import { AppHeader } from "@/components/layout/AppHeader"
import { useBookingForm } from "@/hooks/useBookingForm"
import { ModalType, useBookingModal } from "@/hooks/useBookingModal"
import { useBookingStore, type Booking } from "@/store/useBookingStore"
import { buildDefaultBookingFormValues, normalizeBookingFormData } from "@/utils/bookingDates"

export function BookingPage() {
  const store = useBookingStore()
  const modal = useBookingModal()
  const detailsModal = useBookingModal<Booking>()
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean
    bookingId: string | null
    guestName: string | null
  }>({
    isOpen: false,
    bookingId: null,
    guestName: null,
  })

  const selectedBooking = store.bookings.find((b) => b.id === store.selectedId) ?? null
  const form = useBookingForm(selectedBooking)

  const openCreateModal = () => {
    modal.open(ModalType.create)
    store.selectBooking(null)
    form.reset(buildDefaultBookingFormValues())
  }

  const openEditModal = (booking: Booking) => {
    modal.open(ModalType.edit)
    store.selectBooking(booking.id)
  }

  const handleSubmit = form.handleSubmit((values) => {
    const normalized = normalizeBookingFormData(values)
    const conflict = store.hasConflict(normalized, selectedBooking?.id ?? null)
    if (conflict) {
      const message = "This booking overlaps with another booking for the same dates"
      form.setError("startDate", { type: "manual", message })
      form.setError("endDate", { type: "manual", message })
      return
    }

    if (selectedBooking) {
      store.updateBooking(selectedBooking.id, normalized)
    } else {
      store.addBooking(normalized)
    }

    store.selectBooking(null)
    form.reset(buildDefaultBookingFormValues())
    modal.close()
  })

  const handleDeleteClick = (id: string) => {
    const booking = store.bookings.find((b) => b.id === id)
    if (booking) {
      setDeleteConfirmation({
        isOpen: true,
        bookingId: id,
        guestName: booking.guestName,
      })
    }
  }

  const handleDeleteConfirm = () => {
    if (deleteConfirmation.bookingId) {
      store.deleteBooking(deleteConfirmation.bookingId)

      if (store.selectedId === deleteConfirmation.bookingId) {
        store.selectBooking(null)
        form.reset(buildDefaultBookingFormValues())
      }
    }

    setDeleteConfirmation({
      isOpen: false,
      bookingId: null,
      guestName: null,
    })
  }

  const handleDeleteCancel = () => {
    setDeleteConfirmation({
      isOpen: false,
      bookingId: null,
      guestName: null,
    })
  }

  const handleModalClose = () => {
    store.selectBooking(null)
    modal.close()
  }

  return (
    <>
      <AppHeader onCreateClick={openCreateModal} />

      <main className="space-y-4">
        <BookingList
          bookings={store.bookings}
          onEdit={openEditModal}
          onDelete={handleDeleteClick}
          onCreateNew={openCreateModal}
          onView={detailsModal.open}
        />
      </main>

      <BookingDialog
        isOpen={modal.isOpen}
        mode={modal.mode}
        selectedBooking={selectedBooking}
        form={form}
        onSubmit={handleSubmit}
        onClose={handleModalClose}
      />

      <BookingDetailsDialog
        booking={detailsModal.data}
        isOpen={detailsModal.isOpen}
        onClose={detailsModal.close}
        onEdit={(booking) => {
          detailsModal.close()
          openEditModal(booking)
        }}
      />

      <ConfirmationDialog
        isOpen={deleteConfirmation.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete booking"
        description={ `Are you sure you want to delete the booking for ${deleteConfirmation.guestName}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  )
}