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

export type BookingCreateDto = {
    bookingId?: number
    roomId: number
    userId: number
    purpose: string
    startTime: string
    endTime: string
}
