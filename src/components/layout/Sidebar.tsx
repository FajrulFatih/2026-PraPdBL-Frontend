import { Drawer, List, ListItemButton, ListItemText, Toolbar } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { useLayout } from '../../hooks/useLayout'

export default function Sidebar() {
  const { isSidebarOpen } = useLayout()
  const width = isSidebarOpen ? 240 : 72

  return (
    <Drawer
      variant="permanent"
      sx={{
        width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width,
          boxSizing: 'border-box',
          borderRight: 'none',
        },
      }}
    >
      <Toolbar />
      <List sx={{ px: 1 }}>
        {[
          { to: '/dashboard', label: 'Dashboard' },
          { to: '/rooms', label: 'Rooms' },
          { to: '/bookings', label: 'Bookings' },
        ].map((item) => (
          <ListItemButton
            key={item.to}
            component={NavLink}
            to={item.to}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              justifyContent: isSidebarOpen ? 'flex-start' : 'center',
            }}
          >
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{ fontWeight: 600, noWrap: true }}
              sx={{ opacity: isSidebarOpen ? 1 : 0, transition: 'opacity 0.2s ease' }}
            />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  )
}