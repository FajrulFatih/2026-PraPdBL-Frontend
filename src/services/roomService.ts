import type { RoomCreateForm, RoomListItem, RoomListResponse } from '../types/room'

const baseUrl = import.meta.env.VITE_API_URL

function ensureBaseUrl() {
    if (!baseUrl) {
        throw new Error('VITE_API_URL is not set')
    }
}

export async function getRooms(page = 1, pageSize = 10) {
    ensureBaseUrl()
    const url = new URL('/api/rooms', baseUrl)
    url.searchParams.set('page', String(page))
    url.searchParams.set('pageSize', String(pageSize))

    const res = await fetch(url.toString())
    if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`)
    }
    return (await res.json()) as RoomListResponse
}

export async function createRoom(dto: RoomCreateForm) {
    ensureBaseUrl()
    const url = new URL('/api/rooms', baseUrl)

    const res = await fetch(url.toString(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
    })

    if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`)
    }
    return (await res.json()) as RoomListItem
}

export async function updateRoom(id: number, dto: RoomCreateForm) {
    ensureBaseUrl()
    const url = new URL(`/api/rooms/${id}`, baseUrl)

    const res = await fetch(url.toString(), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
    })

    if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`)
    }
    return (await res.json()) as RoomListItem
}