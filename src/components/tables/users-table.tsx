'use client'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from './data-table'
import { DataTableColumnHeader } from './data-table/data-table-column-header'
import { DataTableRowActions } from './data-table/data-table-row-actions'
import { User } from '@/constants/types'
import { useGetUsers } from '@/data/hooks/useUsersClient'

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'firstName',
    header: 'First Name'
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name'
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />
  },
  {
    accessorKey: 'role',
    header: 'Role'
  },
  {
    accessorKey: 'isEmailConfirmed',
    header: 'Email Confirmed'
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />
  }
]

export default function UsersTable() {
  const { loading, users } = useGetUsers()
  return <DataTable columns={userColumns} data={users ?? []} isLoading={loading} />
}
