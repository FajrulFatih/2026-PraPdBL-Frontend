export type UserListItem = {
    id: number
    name: string
    email: string
    role: string
}

export type UserListResponse = {
    total: number
    page: number
    pageSize: number
    data: UserListItem[]
}
