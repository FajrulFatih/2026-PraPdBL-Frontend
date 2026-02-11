import type { FormEvent } from 'react'
import { useEffect, useState } from 'react'
import { createBooking, deleteBooking, getBookings, updateBooking, updateBookingStatus } from '../services/bookingService'
import type { BookingCreateDto, BookingListItem } from '../types/booking'
import { emptyBookingForm, toBookingForm } from '../utils/getBookingFormErrors'

export default function useBookings() {
    const [items, setItems] = useState<BookingListItem[]>([])
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [form, setForm] = useState<BookingCreateDto>(emptyBookingForm)
    const [editId, setEditId] = useState<number | null>(null)
    const [note, setNote] = useState('')
    const [pendingId, setPendingId] = useState<number | null>(null)
    const [pendingStatusId, setPendingStatusId] = useState<number | null>(null)

    const refresh = async () => {
        setIsLoading(true)
        try {
            const res = await getBookings()
            setItems(res.data)
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Unknown error')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        refresh()
    }, [])

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            setError(null)
            setIsLoading(true)
            if (editId) {
                await updateBooking(editId, form)
                setEditId(null)
            } else {
                await createBooking(form)
            }
            setForm(emptyBookingForm)
            await refresh()
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Unknown error')
        } finally {
            setIsLoading(false)
        }
    }

    const onEdit = (booking: BookingListItem) => {
        setEditId(booking.id)
        setForm(toBookingForm(booking))
    }

    const onDelete = async (id: number) => {
        try {
            setError(null)
            setIsLoading(true)
            await deleteBooking(id)
            await refresh()
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Unknown error')
        } finally {
            setIsLoading(false)
        }
    }

    const onStatusChange = async (id: number, statusId: number, noteValue?: string) => {
        try {
            setError(null)
            setIsLoading(true)
            await updateBookingStatus(id, statusId, 1, noteValue)
            await refresh()
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Unknown error')
        } finally {
            setIsLoading(false)
        }
    }

    const onStatusSelect = (id: number, statusId: number) => {
        setPendingId(id)
        setPendingStatusId(statusId)
    }

    const onStatusDialogClose = () => {
        setPendingId(null)
        setPendingStatusId(null)
        setNote('')
    }

    const onStatusConfirm = () => {
        if (pendingId == null || pendingStatusId == null) return
        onStatusChange(pendingId, pendingStatusId, note.trim() || undefined)
        onStatusDialogClose()
    }

    const onCancel = () => {
        setEditId(null)
        setForm(emptyBookingForm)
    }

    return {
        items,
        error,
        isLoading,
        form,
        editId,
        setForm,
        onSubmit,
        onEdit,
        onDelete,
        onStatusSelect,
        onStatusConfirm,
        onStatusDialogClose,
        note,
        setNote,
        pendingId,
        pendingStatusId,
        onCancel,
    }
}