export type BookingHistoryItem = {
    id: number
    bookingId: number
    oldStatusId: number
    oldStatusLabel?: string | null
    newStatusId: number
    newStatusLabel?: string | null
    changedById: number
    changedByName?: string | null
    changedAt: string
    note?: string | null
    room: {
        id: number
        code: string
        name: string
    }
    user: {
        id: number
        name: string
    }
}
