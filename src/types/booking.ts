import type { FormEvent } from 'react'

export type BookingListItem = {
    id: number
    purpose: string
    startTime: string
    endTime: string
    statusId: number
    roomId: number
    userId: number
    room?: {
        roomCode: string
        roomName: string
    } | null
    user?: {
        name: string
    } | null
}

export type BookingListResponse = {
    total: number
    page: number
    pageSize: number
    data: BookingListItem[]
}

export type BookingCreateDto = {
    bookingId?: number
    roomId: number
    userId: number
    purpose: string
    startTime: string
    endTime: string
}

export type BookingFormOption = {
    id: number
    label: string
}

export type BookingFormProps = {
    value: BookingCreateDto
    isEditing: boolean
    isLoading: boolean
    onChange: (value: BookingCreateDto) => void
    onSubmit: (event: FormEvent<HTMLFormElement>) => void
    onCancel: () => void
    roomOptions?: BookingFormOption[]
    userOptions?: BookingFormOption[]
}

export type BookingTableProps = {
    items: BookingListItem[]
    onEdit: (item: BookingListItem) => void
    onDelete: (id: number) => void
    onStatusSelect: (id: number, statusId: number) => void
    onStatusConfirm: () => void
    onStatusDialogClose: () => void
    note: string
    onNoteChange: (value: string) => void
    pendingId: number | null
    pendingStatusId: number | null
    isLoading: boolean
}
