import { createContext, useContext } from 'react'

type LayoutContextValue = {
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

export const LayoutContext = createContext<LayoutContextValue | undefined>(
  undefined,
)

export function useLayout() {
  const ctx = useContext(LayoutContext)
  if (!ctx) {
    throw new Error('useLayout must be used within LayoutProvider')
  }
  return ctx
}
