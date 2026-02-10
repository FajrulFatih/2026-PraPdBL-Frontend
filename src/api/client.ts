export type BookingListItem = {
    id: number
    purpose: string
    startTime: string
    endTime: string
    statusId: number
    roomId: number
    userId: number
}

export type BookingListResponse = {
    total: number
    page: number
    pageSize: number
    data: BookingListItem[]
}

const baseUrl = import.meta.env.VITE_API_URL

export async function getBookings(page = 1, pageSize = 10) {
    const url = new URL('/api/bookings', baseUrl)
    url.searchParams.set('page', String(page))
    url.searchParams.set('pageSize', String(pageSize))

    const res = await fetch(url.toString())
    if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`)
    }
    return (await res.json()) as BookingListResponse
}