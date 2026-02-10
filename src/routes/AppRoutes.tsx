import { BrowserRouter, Navigate, Route, Routes, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Sidebar from '../components/layout/Sidebar'
import Content from '../components/layout/Content'
import PageWrapper from '../components/layout/PageWrapper'
import { LayoutProvider } from '../context/layoutContext'
import { getBookings, type BookingListItem } from '../api/client'

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
    const [items, setItems] = useState<BookingListItem[]>([])
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let active = true
        getBookings()
            .then((res) => {
                if (active) setItems(res.data)
            })
            .catch((err: unknown) => {
                if (active) setError(err instanceof Error ? err.message : 'Unknown error')
            })
        return () => {
            active = false
        }
    }, [])

    return (
        <PageWrapper title="Bookings">
            {error ? <p>{error}</p> : null}
            <ul>
                {items.map((b) => (
                    <li key={b.id}>
                        #{b.id} — {b.purpose} ({b.startTime} → {b.endTime})
                    </li>
                ))}
            </ul>
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
