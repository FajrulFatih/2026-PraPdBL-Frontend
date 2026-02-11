import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
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
    TextField,
    Typography,
} from '@mui/material'
import type { BookingTableProps } from '../../types/booking'
import { formatBookingRange } from '../../utils/formatBookingRange'
import { bookingStatusOptions, getBookingRoomLabel, getBookingUserLabel } from '../../utils/bookingList'

export default function BookingTable({
    items,
    onEdit,
    onDelete,
    onStatusSelect,
    onStatusConfirm,
    onStatusDialogClose,
    note,
    onNoteChange,
    pendingId,
    pendingStatusId,
    isLoading,
}: BookingTableProps) {
    return (
        <>
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
                            <TableCell>{getBookingRoomLabel(item)}</TableCell>
                            <TableCell>{getBookingUserLabel(item)}</TableCell>
                            <TableCell>
                                <Select
                                    size="small"
                                    value={item.statusId}
                                    onChange={(event) => {
                                        onStatusSelect(item.id, Number(event.target.value))
                                    }}
                                    disabled={isLoading}
                                >
                                    {bookingStatusOptions.map((status) => (
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

            <Dialog
                open={pendingId != null && pendingStatusId != null}
                onClose={onStatusDialogClose}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Add status note</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        fullWidth
                        label="Note"
                        placeholder="Optional note for this status change"
                        multiline
                        minRows={3}
                        margin="dense"
                        value={note}
                        onChange={(event) => onNoteChange(event.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onStatusDialogClose} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button onClick={onStatusConfirm} variant="contained" disabled={isLoading}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}