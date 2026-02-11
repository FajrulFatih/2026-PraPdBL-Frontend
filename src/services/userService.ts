import type { UserListResponse } from '../types/user'

const baseUrl = import.meta.env.VITE_API_URL

function ensureBaseUrl() {
    if (!baseUrl) {
        throw new Error('VITE_API_URL is not set')
    }
}

export async function getUsers(page = 1, pageSize = 10) {
    ensureBaseUrl()
    const url = new URL('/api/users', baseUrl)
    url.searchParams.set('page', String(page))
    url.searchParams.set('pageSize', String(pageSize))

    const res = await fetch(url.toString())
    if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`)
    }
    return (await res.json()) as UserListResponse
}
