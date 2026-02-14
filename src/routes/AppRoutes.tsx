import { Box, Toolbar } from '@mui/material'
import { BrowserRouter, Navigate, Route, Routes, Outlet } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Sidebar from '../components/layout/Sidebar'
import Content from '../components/layout/Content'
import { LayoutProvider } from '../context/layoutContext'
import DashboardPage from '../pages/DashboardPage'
import RoomsPage from '../pages/RoomsPage'
import BookingsPage from '../pages/BookingsPage'
import BookingHistoryPage from '../pages/BookingHistoryPage'

function AppLayout() {
    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
                <Sidebar />
                <Box sx={{ flexGrow: 1 }}>
                    <Toolbar />
                    <Content>
                        <Outlet />
                    </Content>
                </Box>
            </Box>
        </Box>
    )
}

export default function AppRoutes() {
    return (
        <LayoutProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/rooms" element={<RoomsPage />} />
                        <Route path="/bookings" element={<BookingsPage />} />
                        <Route path="/booking-history" element={<BookingHistoryPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </LayoutProvider>
    )
}
