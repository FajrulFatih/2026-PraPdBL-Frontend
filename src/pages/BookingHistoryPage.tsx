import { Alert, Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import PageWrapper from '../components/layout/PageWrapper'
import useBookingHistory from '../hooks/useBookingHistory'

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short',
})

export default function BookingHistoryPage() {
    const { items, error, isLoading, refresh } = useBookingHistory()

    return (
        <PageWrapper title="Booking History">
            {error ? <Alert severity="error">{error}</Alert> : null}
            <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ mb: 2 }}>
                <Button variant="outlined" onClick={refresh} disabled={isLoading}>
                    Refresh
                </Button>
            </Stack>

            <TableContainer component={Paper} elevation={0}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Room</TableCell>
                            <TableCell>User</TableCell>
                            <TableCell>Change</TableCell>
                            <TableCell>Changed By</TableCell>
                            <TableCell>Changed At</TableCell>
                            <TableCell>Note</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item) => (
                            <TableRow key={item.id} hover>
                                <TableCell>#{item.bookingId}</TableCell>
                                <TableCell>{`${item.room.code} - ${item.room.name}`}</TableCell>
                                <TableCell>{item.user.name}</TableCell>
                                <TableCell>
                                    {item.oldStatusLabel ?? `#${item.oldStatusId}`} -{' '}
                                    {item.newStatusLabel ?? `#${item.newStatusId}`}
                                </TableCell>
                                <TableCell>{item.changedByName ?? `#${item.changedById}`}</TableCell>
                                <TableCell>{dateFormatter.format(new Date(item.changedAt))}</TableCell>
                                <TableCell>{item.note ?? '-'}</TableCell>
                            </TableRow>
                        ))}
                        {items.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    <Typography variant="body2" color="text.secondary">
                                        {isLoading ? 'Loading...' : 'No data'}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : null}
                    </TableBody>
                </Table>
            </TableContainer>
        </PageWrapper>
    )
}
