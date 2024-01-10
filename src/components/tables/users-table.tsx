'use client'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from './data-table'
import { DataTableColumnHeader } from './data-table/data-table-column-header'
import { User } from '@/constants/types'
import { useGetUsers } from '@/data/hooks/useUsersClient'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import ConfirmActionDialog from '../dialogs/confirm-action-dialog'
import UpdateUserRoleForm from '@/components/forms/dashboard/user/update-role-form'
import { UserRoleEnum } from '@/constants/enums'
import { FacetOption } from './data-table/data'
import { CheckCircledIcon, CrossCircledIcon, StopwatchIcon } from '@radix-ui/react-icons'

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },
  {
    accessorKey: 'firstName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="First Name" />
    ),
  },
  {
    accessorKey: 'lastName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Name" />
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const createdAt = row.original.createdAt
      return new Date(createdAt).toLocaleDateString()
    }
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated At" />
    ),
    cell: ({ row }) => {
      const updatedAt = row.original.createdAt
      return new Date(updatedAt).toLocaleDateString()
    }
  },
  {
    id: 'role',
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      return (
        <Badge className="capitalize" variant="outline">
          {row.original.role.toLocaleLowerCase()}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  },
  {
    id: 'action',
    header: 'Action',
    cell: ({ row }) => {
      return (
        <>
          {row.original.role !== UserRoleEnum.SUPER_ADMIN && (
            <ConfirmActionDialog
              title="Edit Role"
              anchor={<Button>Change Role</Button>}
              content={<UpdateUserRoleForm data={row.original} />}
            />
          )}
        </>
      )
    }
  }
]

const userTypeFilter: FacetOption[] = [
  {
    label: 'Admin',
    value: UserRoleEnum.ADMIN,
    icon: CheckCircledIcon
  },
  {
    label: 'Agent',
    value: UserRoleEnum.AGENT,
    icon: StopwatchIcon
  },
  {
    label: 'General Users',
    value: UserRoleEnum.GENERAL_USER,
    icon: CrossCircledIcon
  }
]

export default function UsersTable() {
  const { loading, users } = useGetUsers()
  return (
    <DataTable
      columns={userColumns}
      data={users ?? []}
      isLoading={loading}
      facetKey={'role'}
      facetOptions={userTypeFilter}
    />
  )
}
