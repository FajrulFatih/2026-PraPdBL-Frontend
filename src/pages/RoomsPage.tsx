import {
    Alert,
    Button,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from '@mui/material'
import type { ChangeEvent } from 'react'
import PageWrapper from '../components/layout/PageWrapper'
import RoomCreateDialog from '../components/common/RoomCreateDialog'
import RoomEditDialog from '../components/common/RoomEditDialog'
import useRooms from '../hooks/useRooms'

export default function RoomsPage() {
    const {
        items,
        error,
        isLoading,
        page,
        pageSize,
        total,
        setPage,
        setPageSize,
        refresh,
        createDialog,
        editDialog,
        isBusy,
    } = useRooms()

    return (
        <PageWrapper title="Rooms">
            {error ? <Alert severity="error">{error}</Alert> : null}
            {createDialog.error ? <Alert severity="error">{createDialog.error}</Alert> : null}
            {editDialog.error ? <Alert severity="error">{editDialog.error}</Alert> : null}
            <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ mb: 2 }}>
                <Button variant="contained" onClick={createDialog.openDialog} disabled={isBusy}>
                    Create Room
                </Button>
                <Button variant="outlined" onClick={refresh} disabled={isLoading}>
                    Refresh
                </Button>
            </Stack>

            <TableContainer component={Paper} elevation={0}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Code</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Capacity</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Active</TableCell>
                            <TableCell>Booking Status</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((room) => (
                            <TableRow key={room.id} hover>
                                <TableCell>#{room.id}</TableCell>
                                <TableCell>{room.roomCode}</TableCell>
                                <TableCell>{room.roomName}</TableCell>
                                <TableCell>{room.capacity}</TableCell>
                                <TableCell>{room.location}</TableCell>
                                <TableCell>{room.isActive ? 'Yes' : 'No'}</TableCell>
                                <TableCell>{room.bookingStatus ?? 'N/A'}</TableCell>
                                <TableCell align="right">
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        onClick={() => editDialog.openDialog(room)}
                                        disabled={isBusy}
                                    >
                                        Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {items.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} align="center">
                                    <Typography variant="body2" color="text.secondary">
                                        {isLoading ? 'Loading...' : 'No data'}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : null}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={total}
                    page={page - 1}
                    onPageChange={(_event: unknown, newPage: number) => setPage(newPage + 1)}
                    rowsPerPage={pageSize}
                    onRowsPerPageChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setPageSize(Number(event.target.value || 0))
                        setPage(1)
                    }}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </TableContainer>

            <RoomCreateDialog
                open={createDialog.open}
                value={createDialog.form}
                onClose={createDialog.closeDialog}
                onChange={createDialog.setForm}
                onSubmit={createDialog.submit}
            />

            <RoomEditDialog
                open={editDialog.open}
                value={editDialog.form}
                onClose={editDialog.closeDialog}
                onChange={editDialog.setForm}
                onSubmit={editDialog.submit}
            />
        </PageWrapper>
    )
}
