import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Stack,
    Switch,
    TextField,
} from '@mui/material'
import type { ChangeEvent } from 'react'
import type { RoomCreateForm, RoomEditDialogProps } from '../../types/room'

export default function RoomEditDialog({ open, value, onClose, onSubmit, onChange }: RoomEditDialogProps) {
    const updateField = (field: keyof RoomCreateForm, nextValue: string | number | boolean) => {
        onChange({ ...value, [field]: nextValue })
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Edit Room</DialogTitle>
            <DialogContent dividers>
                <Stack component="form" spacing={2} onSubmit={onSubmit}>
                    <TextField
                        label="Room Code"
                        value={value.roomCode}
                        onChange={(event) => updateField('roomCode', event.target.value)}
                        required
                    />
                    <TextField
                        label="Room Name"
                        value={value.roomName}
                        onChange={(event) => updateField('roomName', event.target.value)}
                        required
                    />
                    <TextField
                        label="Capacity"
                        type="number"
                        value={value.capacity}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            updateField('capacity', Number(event.target.value || 0))
                        }
                        inputProps={{ min: 1 }}
                        required
                    />
                    <TextField
                        label="Location"
                        value={value.location}
                        onChange={(event) => updateField('location', event.target.value)}
                        required
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={value.isActive}
                                onChange={(event) => updateField('isActive', event.target.checked)}
                            />
                        }
                        label="Active"
                    />
                    <DialogActions sx={{ px: 0 }}>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="submit" variant="contained">
                            Update
                        </Button>
                    </DialogActions>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}
