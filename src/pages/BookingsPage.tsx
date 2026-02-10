import { Alert, Stack } from '@mui/material'
import PageWrapper from '../components/layout/PageWrapper'
import BookingForm from '../components/common/BookingForm'
import BookingTable from '../components/common/BookingTable'
import useBookings from '../hooks/useBookings'

export default function BookingsPage() {
    const { items, error, isLoading, form, editId, setForm, onSubmit, onEdit, onDelete, onCancel } = useBookings()

    return (
        <PageWrapper title="Bookings">
            {error ? <Alert severity="error">{error}</Alert> : null}

            <Stack spacing={2}>
                <BookingForm
                    value={form}
                    isEditing={Boolean(editId)}
                    isLoading={isLoading}
                    onChange={setForm}
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                />

                <BookingTable items={items} isLoading={isLoading} onEdit={onEdit} onDelete={onDelete} />
            </Stack>
        </PageWrapper>
    )
}
