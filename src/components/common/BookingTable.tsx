import {
    Button,
    MenuItem,
    Paper,
    Select,
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

const statusOptions = [
    { id: 1, label: 'Pending' },
    { id: 2, label: 'Approved' },
    { id: 3, label: 'Rejected' },
]

type BookingTableProps = {
    items: BookingListItem[]
    onEdit: (item: BookingListItem) => void
    onDelete: (id: number) => void
    onStatusChange: (id: number, statusId: number) => void
    isLoading: boolean
}

export default function BookingTable({ items, onEdit, onDelete, onStatusChange, isLoading }: BookingTableProps) {
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
                        <TableCell>Status</TableCell>
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
                            <TableCell>
                                <Select
                                    size="small"
                                    value={item.statusId}
                                    onChange={(event) => onStatusChange(item.id, Number(event.target.value))}
                                    disabled={isLoading}
                                >
                                    {statusOptions.map((status) => (
                                        <MenuItem key={status.id} value={status.id}>
                                            {status.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </TableCell>
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
    )
}