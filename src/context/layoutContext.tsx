import { useMemo, useState } from 'react'
import { LayoutContext } from '../hooks/useLayout'

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const value = useMemo(
    () => ({
      isSidebarOpen,
      toggleSidebar: () => setIsSidebarOpen((v) => !v),
    }),
    [isSidebarOpen],
  )

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
}
