import type { FormEvent } from 'react'
import { useCallback, useEffect, useState } from 'react'
import { createRoom, getRooms, updateRoom } from '../services/roomService'
import type { RoomCreateForm, RoomListItem } from '../types/room'

type RoomDialogState = {
    open: boolean
    form: RoomCreateForm
    error: string | null
    isSubmitting: boolean
    openDialog: () => void
    closeDialog: () => void
    setForm: (next: RoomCreateForm) => void
    submit: (event: FormEvent<HTMLFormElement>) => Promise<void>
}

type RoomEditDialogState = Omit<RoomDialogState, 'openDialog'> & {
    openDialog: (room: RoomListItem) => void
}

const emptyForm: RoomCreateForm = {
    roomCode: '',
    roomName: '',
    capacity: 1,
    location: '',
    isActive: true,
}

export default function useRooms() {
    const [items, setItems] = useState<RoomListItem[]>([])
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)

    const [isCreateOpen, setIsCreateOpen] = useState(false)
    const [createForm, setCreateForm] = useState(emptyForm)
    const [createError, setCreateError] = useState<string | null>(null)
    const [isCreating, setIsCreating] = useState(false)

    const [isEditOpen, setIsEditOpen] = useState(false)
    const [editForm, setEditForm] = useState(emptyForm)
    const [editId, setEditId] = useState<number | null>(null)
    const [editError, setEditError] = useState<string | null>(null)
    const [isUpdating, setIsUpdating] = useState(false)

    const refresh = useCallback(async () => {
        setIsLoading(true)
        try {
            setError(null)
            const res = await getRooms(page, pageSize)
            setItems(res.data)
            setTotal(res.total)
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Unknown error')
        } finally {
            setIsLoading(false)
        }
    }, [page, pageSize])

    useEffect(() => {
        refresh()
    }, [refresh])

    const openCreate = () => setIsCreateOpen(true)
    const closeCreate = () => {
        setIsCreateOpen(false)
        setCreateForm(emptyForm)
        setCreateError(null)
    }

    const openEdit = (room: RoomListItem) => {
        setEditId(room.id)
        setEditForm({
            roomCode: room.roomCode,
            roomName: room.roomName,
            capacity: room.capacity,
            location: room.location,
            isActive: room.isActive,
        })
        setIsEditOpen(true)
    }

    const closeEdit = () => {
        setIsEditOpen(false)
        setEditId(null)
        setEditForm(emptyForm)
        setEditError(null)
    }

    const submitCreate = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            setCreateError(null)
            setIsCreating(true)
            await createRoom(createForm)
            await refresh()
            closeCreate()
        } catch (err: unknown) {
            setCreateError(err instanceof Error ? err.message : 'Unknown error')
        } finally {
            setIsCreating(false)
        }
    }

    const submitEdit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (editId === null) return

        try {
            setEditError(null)
            setIsUpdating(true)
            await updateRoom(editId, editForm)
            await refresh()
            closeEdit()
        } catch (err: unknown) {
            setEditError(err instanceof Error ? err.message : 'Unknown error')
        } finally {
            setIsUpdating(false)
        }
    }

    const createDialog: RoomDialogState = {
        open: isCreateOpen,
        form: createForm,
        error: createError,
        isSubmitting: isCreating,
        openDialog: openCreate,
        closeDialog: closeCreate,
        setForm: setCreateForm,
        submit: submitCreate,
    }

    const editDialog: RoomEditDialogState = {
        open: isEditOpen,
        form: editForm,
        error: editError,
        isSubmitting: isUpdating,
        openDialog: openEdit,
        closeDialog: closeEdit,
        setForm: setEditForm,
        submit: submitEdit,
    }

    return {
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
        isBusy: isCreating || isUpdating,
    }
}
