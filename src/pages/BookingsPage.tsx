import { Alert, Stack } from '@mui/material'
import PageWrapper from '../components/layout/PageWrapper'
import BookingForm from '../components/common/BookingForm'
import BookingTable from '../components/common/BookingTable'
import useBookings from '../hooks/useBookings'
import useRooms from '../hooks/useRooms'
import useUsers from '../hooks/useUsers'

export default function BookingsPage() {
    const booking = useBookings()
    const { items: rooms, error: roomsError, isLoading: roomsLoading } = useRooms()
    const { items: users, error: usersError, isLoading: usersLoading } = useUsers()

    const roomOptions = rooms.map((room) => ({
        id: room.id,
        label: `${room.roomCode} - ${room.roomName}`,
    }))

    const userOptions = users.map((user) => ({
        id: user.id,
        label: user.name,
    }))

    return (
        <PageWrapper title="Bookings">
            {booking.error ? <Alert severity="error">{booking.error}</Alert> : null}
            {roomsError ? <Alert severity="error">{roomsError}</Alert> : null}
            {usersError ? <Alert severity="error">{usersError}</Alert> : null}

            <Stack spacing={2}>
                <BookingForm
                    value={booking.form}
                    isEditing={Boolean(booking.editId)}
                    isLoading={booking.isLoading || roomsLoading || usersLoading}
                    onChange={booking.setForm}
                    onSubmit={booking.onSubmit}
                    onCancel={booking.onCancel}
                    roomOptions={roomOptions}
                    userOptions={userOptions}
                />

                <BookingTable
                    items={booking.items}
                    isLoading={booking.isLoading}
                    onEdit={booking.onEdit}
                    onDelete={booking.onDelete}
                    onStatusSelect={booking.onStatusSelect}
                    onStatusConfirm={booking.onStatusConfirm}
                    onStatusDialogClose={booking.onStatusDialogClose}
                    note={booking.note}
                    onNoteChange={booking.setNote}
                    pendingId={booking.pendingId}
                    pendingStatusId={booking.pendingStatusId}
                />
            </Stack>
        </PageWrapper>
    )
}
