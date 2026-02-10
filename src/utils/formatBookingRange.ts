import dayjs from 'dayjs'

export function formatBookingRange(start: string, end: string) {
    const startDate = dayjs(start)
    const endDate = dayjs(end)

    if (!startDate.isValid() || !endDate.isValid()) {
        return `${start} - ${end}`
    }

    if (startDate.format('YYYY-MM-DD') === endDate.format('YYYY-MM-DD')) {
        return `${startDate.format('DD MMM YYYY, HH:mm')} - ${endDate.format('HH:mm')}`
    }

    return `${startDate.format('DD MMM YYYY, HH:mm')} - ${endDate.format('DD MMM YYYY, HH:mm')}`
}