import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import './styles/global.css'
import './styles/variables.css'
import App from './App.tsx'

const theme = createTheme({
  palette: {
    primary: {
      main: '#0f4c5c',
    },
    background: {
      default: '#f7f3ef',
      paper: '#ffffff',
    },
    text: {
      primary: '#1f2937',
      secondary: '#6b7280',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: "'Plus Jakarta Sans', 'Segoe UI', Tahoma, sans-serif",
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
