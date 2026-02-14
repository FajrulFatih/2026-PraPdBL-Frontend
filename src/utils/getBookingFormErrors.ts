import type { BookingCreateDto, BookingListItem } from '../types/booking'
import { toDateValue } from './bookingDate'

export type BookingFormErrors = {
    purpose: string | null
    roomId: string | null
    userId: string | null
    startTime: string | null
    endTime: string | null
}

export const emptyBookingForm: BookingCreateDto = {
    roomId: 1,
    userId: 1,
    purpose: '',
    startTime: '',
    endTime: '',
}

export const toBookingForm = (booking: BookingListItem): BookingCreateDto => ({
    roomId: booking.roomId,
    userId: booking.userId,
    purpose: booking.purpose,
    startTime: booking.startTime,
    endTime: booking.endTime,
})

export function getBookingFormErrors(value: BookingCreateDto, submitted: boolean) {
    const startDate = toDateValue(value.startTime)
    const endDate = toDateValue(value.endTime)
    const isStartValid = Boolean(startDate?.isValid())
    const isEndValid = Boolean(endDate?.isValid())
    const timeRangeError = submitted && isStartValid && isEndValid && endDate!.isBefore(startDate!)

    const errors: BookingFormErrors = {
        purpose: submitted && value.purpose.trim().length === 0 ? 'Purpose is required' : null,
        roomId:
            submitted && (!Number.isFinite(value.roomId) || value.roomId <= 0)
                ? 'Room ID must be greater than 0'
                : null,
        userId:
            submitted && (!Number.isFinite(value.userId) || value.userId <= 0)
                ? 'User ID must be greater than 0'
                : null,
        startTime: submitted && !isStartValid ? 'Start time is required' : null,
        endTime: submitted
            ? timeRangeError
                ? 'End time must be after start time'
                : !isEndValid
                  ? 'End time is required'
                  : null
            : null,
    }

    const isInvalid = Object.values(errors).some(Boolean)

    return { errors, isInvalid }
}