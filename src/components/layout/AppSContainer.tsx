type AppContainerProps = {
  children: React.ReactNode
}

export function AppContainer({ children }: AppContainerProps) {
    return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,oklch(0.98_0_0),oklch(0.94_0_0))] px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">{children}</div>
    </div>
  )
}


