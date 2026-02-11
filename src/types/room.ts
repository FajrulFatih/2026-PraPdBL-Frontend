export type RoomListItem = {
    id: number
    roomCode: string
    roomName: string
    capacity: number
    location: string
    isActive: boolean
    bookingStatus?: string | null
}

export type RoomListResponse = {
    total: number
    page: number
    pageSize: number
    data: RoomListItem[]
}