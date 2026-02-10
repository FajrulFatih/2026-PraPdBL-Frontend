import {
    Button,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material'
import type { BookingListItem } from '../../types/booking'
import { formatBookingRange } from '../../utils/formatBookingRange'

type BookingTableProps = {
    items: BookingListItem[]
    onEdit: (item: BookingListItem) => void
    onDelete: (id: number) => void
    isLoading: boolean
}

export default function BookingTable({ items, onEdit, onDelete, isLoading }: BookingTableProps) {
    return (
        <TableContainer component={Paper} elevation={0}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Purpose</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Room</TableCell>
                        <TableCell>User</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item) => (
                        <TableRow key={item.id} hover>
                            <TableCell>#{item.id}</TableCell>
                            <TableCell>{item.purpose}</TableCell>
                            <TableCell>{formatBookingRange(item.startTime, item.endTime)}</TableCell>
                            <TableCell>{item.roomId}</TableCell>
                            <TableCell>{item.userId}</TableCell>
                            <TableCell align="right">
                                <Stack direction="row" spacing={1} justifyContent="flex-end">
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        disabled={isLoading}
                                        onClick={() => onEdit(item)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        color="error"
                                        disabled={isLoading}
                                        onClick={() => onDelete(item.id)}
                                    >
                                        Delete
                                    </Button>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    ))}
                    {items.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} align="center">
                                <Typography variant="body2" color="text.secondary">
                                    {isLoading ? 'Loading...' : 'No data'}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ) : null}
                </TableBody>
            </Table>
        </TableContainer>
    )
}