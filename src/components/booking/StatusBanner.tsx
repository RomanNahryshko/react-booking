type StatusBannerProps = {
  type: "success" | "error"
  text: string
  onClose: () => void
}

export function StatusBanner({ type, text, onClose }: StatusBannerProps) {
  const isError = type === "error"

  return (
    <div
      className={[
        "relative mb-6 flex items-center rounded-lg border px-4 py-2.5 text-sm font-medium",
        isError
          ? "border-destructive/60 bg-destructive/10 text-destructive"
          : "border-emerald-500/60 bg-emerald-500/10 text-emerald-700",
      ].join(" ")}
    >
      <span>{text}</span>
      <button
        type="button"
        aria-label="Dismiss status message"
        onClick={onClose}
        className="ml-auto inline-flex size-6 items-center justify-center rounded-full text-xs hover:bg-foreground/5"
      >
        ×
      </button>
    </div>
  )
}


