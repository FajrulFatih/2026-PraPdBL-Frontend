import type { BookingCreateDto, BookingListItem, BookingListResponse } from '../types/booking'
import type { BookingHistoryItem } from '../types/bookingHistory'

const baseUrl = import.meta.env.VITE_API_URL

function ensureBaseUrl() {
    if (!baseUrl) {
        throw new Error('VITE_API_URL is not set')
    }
}

export async function getBookings(page = 1, pageSize = 10) {
    ensureBaseUrl()
    const url = new URL('/api/bookings', baseUrl)
    url.searchParams.set('page', String(page))
    url.searchParams.set('pageSize', String(pageSize))

    const res = await fetch(url.toString())
    if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`)
    }
    return (await res.json()) as BookingListResponse
}

export async function getBooking(id: number) {
    ensureBaseUrl()
    const url = new URL(`/api/bookings/${id}`, baseUrl)

    const res = await fetch(url.toString())
    if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`)
    }
    return (await res.json()) as BookingListItem
}

export async function createBooking(dto: BookingCreateDto) {
    ensureBaseUrl()
    const url = new URL('/api/bookings', baseUrl)

    const res = await fetch(url.toString(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
    })

    if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`)
    }
    return (await res.json()) as BookingListItem
}

export async function updateBooking(id: number, dto: BookingCreateDto) {
    ensureBaseUrl()
    const url = new URL(`/api/bookings/${id}`, baseUrl)
    const payload: BookingCreateDto = { ...dto, bookingId: id }

    const res = await fetch(url.toString(), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    })

    if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`)
    }
    return (await res.json()) as BookingListItem
}

export async function deleteBooking(id: number) {
    ensureBaseUrl()
    const url = new URL(`/api/bookings/${id}`, baseUrl)

    const res = await fetch(url.toString(), { method: 'DELETE' })
    if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`)
    }
}

export async function updateBookingStatus(id: number, statusId: number, changedBy: number, note?: string) {
    ensureBaseUrl()
    const url = new URL(`/api/bookings/${id}/status`, baseUrl)

    const res = await fetch(url.toString(), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ statusId, changedBy, note }),
    })

    if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`)
    }
    return (await res.json()) as BookingListItem
}

export async function getBookingHistory() {
    ensureBaseUrl()
    const url = new URL('/api/bookings/history', baseUrl)

    const res = await fetch(url.toString())
    if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`)
    }
    return (await res.json()) as BookingHistoryItem[]
}
