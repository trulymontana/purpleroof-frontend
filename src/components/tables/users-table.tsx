'use client'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from './data-table'
import { DataTableColumnHeader } from './data-table/data-table-column-header'
import { User } from '@/constants/types'
import { useGetUsers } from '@/data/hooks/useUsersClient'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import ConfirmActionDialog from '../dialogs/confirm-action-dialog'
import UpdateUserRoleForm from '@/app/dashboard/admin/users/_forms/update-role-form'

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
    id: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      return new Date(createdAt).toLocaleDateString()
    }
  },
  {
    id: 'updatedAt',
    header: 'Updated At',
    cell: ({ row }) => {
      const updatedAt = row.original.createdAt;
      return new Date(updatedAt).toLocaleDateString()
    }
  },
  {
    id: 'role',
    header: 'Role',
    cell: ({ row }) => {
      return <Badge className='capitalize'>{row.original.role.toLocaleLowerCase()}</Badge>
    }
  },
  {
    id: 'action',
    header: 'Action',
    cell: ({ row }) => {
      return (
        <>
          < ConfirmActionDialog
            title="Edit Role"
            anchor={
              <Button>
                Update Role
              </Button>
            }
            content={<UpdateUserRoleForm data={row.original} />}
          />
        </>
      )
    }
  }
]

export default function UsersTable() {
  const { loading, users } = useGetUsers()
  return <DataTable columns={userColumns} data={users ?? []} isLoading={loading} />
}
