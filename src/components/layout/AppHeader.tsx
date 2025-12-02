import { Button } from "../ui/button"

type AppHeaderProps = {
  onCreateClick: () => void
}

export function AppHeader({ onCreateClick }: AppHeaderProps) {
  return (
    <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div className="space-y-1">
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Bookings dashboard
        </p>
        <h1 className="text-balance text-2xl font-semibold sm:text-3xl">
          Manage every stay in one place
        </h1>
        <p className="mt-1 max-w-xl text-sm text-muted-foreground">
          Create, update or cancel reservations with validation that prevents overlapping bookings.
        </p>
      </div>
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
        <Button
          onClick={onCreateClick}
        >
          Create booking
        </Button>
      </div>
    </header>
  )
}


