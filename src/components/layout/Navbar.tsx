import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import { useLayout } from '../../hooks/useLayout'

export default function Navbar() {
  const { toggleSidebar } = useLayout()

  return (
    <AppBar position="sticky" elevation={0} color="primary">
      <Toolbar sx={{ gap: 2 }}>
        <IconButton color="inherit" edge="start" onClick={toggleSidebar}>
          ☰
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          PraPdBL
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant="body2" sx={{ opacity: 0.85 }}>
          Admin
        </Typography>
      </Toolbar>
    </AppBar>
  )
}