import { BrowserRouter, Navigate, Route, Routes, Outlet } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Sidebar from '../components/layout/Sidebar'
import Content from '../components/layout/Content'
import PageWrapper from '../components/layout/PageWrapper'
import { LayoutProvider } from '../context/LayoutContext'

function AppLayout() {
return (
<div className="app-shell">
    <Navbar />
    <div className="app-body">
        <Sidebar />
        <Content>
            <Outlet />
        </Content>
    </div>
</div>
)
}

function DashboardPage() {
return (
<PageWrapper title="Dashboard">
    <p>Welcome to PraPdBL Dashboard.</p>
</PageWrapper>
)
}

function RoomsPage() {
return (
<PageWrapper title="Rooms">
    <p>Manage rooms here.</p>
</PageWrapper>
)
}

function BookingsPage() {
return (
<PageWrapper title="Bookings">
    <p>Manage bookings here.</p>
</PageWrapper>
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
            </Route>
        </Routes>
    </BrowserRouter>
</LayoutProvider>
)
}
