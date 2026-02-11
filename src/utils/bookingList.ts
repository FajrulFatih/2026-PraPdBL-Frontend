import type { BookingListItem } from '../types/booking'

export const bookingStatusOptions = [
    { id: 1, label: 'Pending' },
    { id: 2, label: 'Approved' },
    { id: 3, label: 'Rejected' },
]

export function getBookingRoomLabel(item: BookingListItem) {
    return item.room ? `${item.room.roomCode} - ${item.room.roomName}` : `#${item.roomId}`
}

export function getBookingUserLabel(item: BookingListItem) {
    return item.user?.name ?? `#${item.userId}`
}
