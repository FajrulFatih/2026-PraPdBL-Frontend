import { useLayout } from '../../hooks/useLayout'

export default function Navbar() {
  const { toggleSidebar } = useLayout()

  return (
    <header className="app-navbar">
      <button className="app-button" onClick={toggleSidebar}>
        ☰
      </button>
      <div className="app-brand">PraPdBL</div>
      <div className="app-spacer" />
      <div className="app-user">Admin</div>
    </header>
  )
}