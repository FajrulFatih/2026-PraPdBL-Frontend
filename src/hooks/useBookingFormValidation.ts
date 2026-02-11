import { useState, type FormEvent } from 'react'
import type { BookingCreateDto } from '../types/booking'
import { toPayloadValue, toPickerValue } from '../utils/bookingDate'
import { getBookingFormErrors } from '../utils/getBookingFormErrors'

export function useBookingFormValidation(
	value: BookingCreateDto,
	onSubmit: (event: FormEvent<HTMLFormElement>) => void,
) {
	const [submitted, setSubmitted] = useState(false)
	const { errors, isInvalid } = getBookingFormErrors(value, submitted)

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		setSubmitted(true)
		if (isInvalid) {
			event.preventDefault()
			return
		}
		onSubmit(event)
	}

	return {
		errors,
		handleSubmit,
		toPickerValue,
		toPayloadValue,
	}
}
