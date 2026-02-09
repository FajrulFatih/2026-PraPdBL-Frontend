import { NavLink } from 'react-router-dom'
import { useLayout } from '../../hooks/useLayout'

export default function Sidebar() {
  const { isSidebarOpen } = useLayout()

  return (
    <aside className={`app-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
      <nav>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/rooms">Rooms</NavLink>
        <NavLink to="/bookings">Bookings</NavLink>
      </nav>
    </aside>
  )
}