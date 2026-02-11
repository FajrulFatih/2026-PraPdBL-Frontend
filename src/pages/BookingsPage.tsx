import { Alert, Stack } from '@mui/material'
import PageWrapper from '../components/layout/PageWrapper'
import BookingForm from '../components/common/BookingForm'
import BookingTable from '../components/common/BookingTable'
import useBookings from '../hooks/useBookings'
import useRooms from '../hooks/useRooms'
import useUsers from '../hooks/useUsers'

export default function BookingsPage() {
    const { items, error, isLoading, form, editId, setForm, onSubmit, onEdit, onDelete, onStatusChange, onCancel } =
        useBookings()
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
            {error ? <Alert severity="error">{error}</Alert> : null}
            {roomsError ? <Alert severity="error">{roomsError}</Alert> : null}
            {usersError ? <Alert severity="error">{usersError}</Alert> : null}

            <Stack spacing={2}>
                <BookingForm
                    value={form}
                    isEditing={Boolean(editId)}
                    isLoading={isLoading || roomsLoading || usersLoading}
                    onChange={setForm}
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    roomOptions={roomOptions}
                    userOptions={userOptions}
                />

                <BookingTable
                    items={items}
                    isLoading={isLoading}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onStatusChange={onStatusChange}
                />
            </Stack>
        </PageWrapper>
    )
}
