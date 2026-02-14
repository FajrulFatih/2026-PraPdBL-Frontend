import type { FormEvent } from 'react'

export type RoomListItem = {
    id: number
    roomCode: string
    roomName: string
    capacity: number
    location: string
    isActive: boolean
    bookingStatus?: string | null
}

export type RoomListResponse = {
    total: number
    page: number
    pageSize: number
    data: RoomListItem[]
}

export type RoomCreateForm = {
    roomCode: string
    roomName: string
    capacity: number
    location: string
    isActive: boolean
}

export type RoomCreateDialogProps = {
    open: boolean
    value: RoomCreateForm
    onClose: () => void
    onSubmit: (event: FormEvent<HTMLFormElement>) => void
    onChange: (next: RoomCreateForm) => void
}

export type RoomEditDialogProps = {
    open: boolean
    value: RoomCreateForm
    onClose: () => void
    onSubmit: (event: FormEvent<HTMLFormElement>) => void
    onChange: (next: RoomCreateForm) => void
}