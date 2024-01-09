'use client'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from './data-table'
import { MortgageApplication } from '@/constants/types'
import { useDeleteMortgageMutation, useGetMortgages } from '@/data/hooks/useMortgageClient'
import Link from 'next/link'
import { Badge } from '../ui/badge'
import { MortgageStatusEnum, UserRoleEnum } from '@/constants/enums'
import { PageRoutes } from '@/constants/page-routes'
import { Button } from '../ui/button'
import UpdateMortgageStatusForm from '@/app/dashboard/mortgages/_forms/update-status-form'
import ConfirmActionDialog from '../dialogs/confirm-action-dialog'
import ConfirmDeleteDialog from '../dialogs/confirm-delete-dialog'
import { LocalStorageKeys } from '@/constants/local-storage-keys'
import currency from '@/lib/currency'
import { useGetUserRole } from '@/data/hooks/useAuthClient'
import { CheckCircledIcon, CrossCircledIcon, StopwatchIcon } from '@radix-ui/react-icons'
import { FacetOption } from './data-table/data'
import { DataTableColumnHeader } from './data-table/data-table-column-header'

export default function MortgagesTable() {
  const role = useGetUserRole()
  const isAdmin = role === UserRoleEnum.ADMIN || role === UserRoleEnum.SUPER_ADMIN

  const columns: ColumnDef<MortgageApplication>[] = [
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
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
    },
    {
      accessorKey: 'phoneNumber',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Phone Number" />
      ),
    },
    {
      accessorKey: 'dateOfBirth',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date of Birth" />
      ),
      cell: ({ row }) => {
        const data = row.original
        const dob = new Date(data.dateOfBirth).toLocaleDateString()
        return <div>{dob}</div>
      }
    },
    {
      accessorKey: 'monthlyIncome',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Montly Income" />
      ),
      cell: ({ row }) => {
        const monthlyIncome = row.original.monthlyIncome
        return <span>{currency.format(monthlyIncome)}</span>
      }
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
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const data = row.original
        if (data.status === MortgageStatusEnum.APPROVED) {
          return <Badge className={`bg-teal-600 text-white hover:bg-teal-500`}>{data.status}</Badge>
        }
        if (data.status === MortgageStatusEnum.CASE_DECLINED) {
          return <Badge className={`bg-red-600 text-white hover:bg-red-500`}>{data.status}</Badge>
        }
        return <Badge variant="outline">{data.status}</Badge>
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      }
    },
    {
      id: 'action',
      header: 'Action',
      cell: ({ row }) => {
        const data = row.original
        if (data.status === MortgageStatusEnum.SUBMITTED) {
          return (
            <Link
              href={
                isAdmin
                  ? PageRoutes.dashboard.MORTGAGE_DETAILS(row.original.id)
                  : PageRoutes.dashboard.COMPLETE_MORTGAGE_APPLICATION(
                    data.id,
                    LocalStorageKeys.MORTGAGE_TRANSACTION_INFO
                  )
              }
            >
              <Button size="sm">{isAdmin ? 'View Details' : 'Complete Application'}</Button>
            </Link>
          )
        }
        return (
          <Link href={PageRoutes.dashboard.MORTGAGE_DETAILS(row.original.id)}>
            <Button size="sm">{isAdmin ? 'View Details' : 'View Application'}</Button>
          </Link>
        )
      }
    }
  ]
  const { mutate: deleteMortgage, isPending } = useDeleteMortgageMutation()
  const { loading, data } = useGetMortgages()

  if (role === UserRoleEnum.ADMIN || role === UserRoleEnum.SUPER_ADMIN) {
    columns.push({
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => (
        <div className="flex items-center">
          {isAdmin && (
            <ConfirmActionDialog
              title="Edit Mortgage"
              anchor={
                <Button variant="secondary" size="sm">
                  Update Status
                </Button>
              }
              content={<UpdateMortgageStatusForm data={row.original} />}
            />
          )}
          {isAdmin && <ConfirmDeleteDialog onDelete={() => deleteMortgage(row.original.id)} isLoading={isPending} />}
        </div>
      )
    })
  }

  const mortgageFilterOptions: FacetOption[] = [
    {
      label: 'Approved',
      value: MortgageStatusEnum.APPROVED,
      icon: CheckCircledIcon
    },
    {
      label: 'Pending',
      value: MortgageStatusEnum.SUBMITTED,
      icon: StopwatchIcon
    },
    {
      label: 'Rejected',
      value: MortgageStatusEnum.CASE_DECLINED,
      icon: CrossCircledIcon
    }
  ]

  return (
    <DataTable
      columns={columns}
      data={data ?? []}
      isLoading={loading}
      facetKey={'status'}
      facetOptions={mortgageFilterOptions}
    />
  )
}
