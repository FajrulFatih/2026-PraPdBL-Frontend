import dayjs, { type Dayjs } from 'dayjs'

export const toPickerValue = (input: string) => (input ? dayjs(input) : null)

export const toPayloadValue = (input: Dayjs | null) => (input ? input.format('YYYY-MM-DDTHH:mm') : '')

export const toDateValue = (input: string) => (input ? dayjs(input) : null)
