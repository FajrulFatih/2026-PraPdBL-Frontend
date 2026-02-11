import { useEffect, useState } from 'react'
import { getBookingHistory } from '../services/bookingService'
import type { BookingHistoryItem } from '../types/bookingHistory'

export default function useBookingHistory() {
    const [items, setItems] = useState<BookingHistoryItem[]>([])
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const refresh = async () => {
        setIsLoading(true)
        try {
            const res = await getBookingHistory()
            setItems(res)
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Unknown error')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        refresh()
    }, [])

    return {
        items,
        error,
        isLoading,
        refresh,
    }
}
