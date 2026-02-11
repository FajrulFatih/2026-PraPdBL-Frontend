import { Box, Button, Grid, Stack, TextField, MenuItem } from '@mui/material'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import type { BookingFormProps } from '../../types/booking'
import { useBookingFormValidation } from '../../hooks/useBookingFormValidation'

export default function BookingForm({
    value,
    isEditing,
    isLoading,
    onChange,
    onSubmit,
    onCancel,
    roomOptions = [],
    userOptions = [],
}: BookingFormProps) {
    const { errors, handleSubmit, toPickerValue, toPayloadValue } = useBookingFormValidation(value, onSubmit)

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                        <TextField
                            label="Purpose"
                            placeholder="Purpose"
                            value={value.purpose}
                            onChange={(event) => onChange({ ...value, purpose: event.target.value })}
                            size="small"
                            required
                            disabled={isLoading}
                            error={Boolean(errors.purpose)}
                            helperText={errors.purpose ?? undefined}
                            fullWidth
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                        <DateTimePicker
                            label="Start Time"
                            value={toPickerValue(value.startTime)}
                            onChange={(newValue) => onChange({ ...value, startTime: toPayloadValue(newValue) })}
                            disabled={isLoading}
                            slotProps={{
                                textField: {
                                    size: 'small',
                                    fullWidth: true,
                                    required: true,
                                    error: Boolean(errors.startTime),
                                    helperText: errors.startTime ?? undefined,
                                },
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                        <DateTimePicker
                            label="End Time"
                            value={toPickerValue(value.endTime)}
                            onChange={(newValue) => onChange({ ...value, endTime: toPayloadValue(newValue) })}
                            disabled={isLoading}
                            slotProps={{
                                textField: {
                                    size: 'small',
                                    fullWidth: true,
                                    required: true,
                                    error: Boolean(errors.endTime),
                                    helperText: errors.endTime ?? undefined,
                                },
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                        <TextField
                            label="Room"
                            select
                            value={value.roomId}
                            onChange={(event) => onChange({ ...value, roomId: Number(event.target.value) })}
                            size="small"
                            required
                            disabled={isLoading}
                            error={Boolean(errors.roomId)}
                            helperText={errors.roomId ?? undefined}
                            fullWidth
                        >
                            {roomOptions.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                        <TextField
                            label="User"
                            select
                            value={value.userId}
                            onChange={(event) => onChange({ ...value, userId: Number(event.target.value) })}
                            size="small"
                            required
                            disabled={isLoading}
                            error={Boolean(errors.userId)}
                            helperText={errors.userId ?? undefined}
                            fullWidth
                        >
                            {userOptions.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Stack direction="row" spacing={1}>
                            <Button type="submit" variant="contained" disabled={isLoading}>
                                {isEditing ? 'Update' : 'Create'}
                            </Button>
                            {isEditing ? (
                                <Button type="button" variant="outlined" onClick={onCancel} disabled={isLoading}>
                                    Cancel
                                </Button>
                            ) : null}
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </LocalizationProvider>
    )
}
