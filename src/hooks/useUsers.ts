import { useCallback, useEffect, useState } from 'react'
import { getUsers } from '../services/userService'
import type { UserListItem } from '../types/user'

export default function useUsers() {
    const [items, setItems] = useState<UserListItem[]>([])
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)

    const refresh = useCallback(async () => {
        setIsLoading(true)
        try {
            setError(null)
            const res = await getUsers(page, pageSize)
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
    }
}
