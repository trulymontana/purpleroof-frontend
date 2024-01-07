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

export default function MortgagesTable() {

  const columns: ColumnDef<MortgageApplication>[] = [
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
      header: 'Email'
    },
    {
      accessorKey: 'phoneNumber',
      header: 'Phone Number'
    },
    {
      id: 'dateOfBirth',
      header: 'Date of Birth',
      cell: ({ row }) => {
        const data = row.original
        const dob = new Date(data.dateOfBirth).toLocaleDateString()
        return <div>{dob}</div>
      }
    },
    {
      id: 'monthlyIncome',
      header: 'Monthly Income',
      cell: ({ row }) => {
        const monthlyIncome = row.original.monthlyIncome
        return <span>{currency.format(monthlyIncome)}</span>
      }
    },
    {
      id: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const data = row.original
        return <Badge variant="outline">{data.status}</Badge>
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
              href={PageRoutes.dashboard.COMPLETE_MORTGAGE_APPLICATION(
                data.id,
                LocalStorageKeys.MORTGAGE_TRANSACTION_INFO
              )}
            >
              <Badge>Complete Your Application</Badge>
            </Link>
          )
        }
        return (
          <Link href={PageRoutes.dashboard.MORTGAGE_DETAILS(row.original.id)}>
            <Button size="sm">View Your Application</Button>
          </Link>
        )
      }
    },
    {
      id: "updateStatus",
      header: "Update Status",
      cell: ({ row }) => (
        <ConfirmActionDialog
          title="Edit Mortgage"
          anchor={
            <Button size="sm" className='w-full'>
              Update
            </Button>
          }
          content={<UpdateMortgageStatusForm data={row.original} />}
        />
      )
    },
  ]
  const { mutate: deleteMortgage, isPending } = useDeleteMortgageMutation()
  const { loading, data } = useGetMortgages()
  const { data: role } = useGetUserRole();

  if (role === UserRoleEnum.ADMIN || role === UserRoleEnum.ADMIN) {
    columns.push({
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => (
        <div className="flex items-center">
          <ConfirmDeleteDialog onDelete={() => deleteMortgage(row.original.id)} isLoading={isPending} />
        </div>
      )
    })
  }
  return <DataTable columns={columns} data={data ?? []} isLoading={loading} />
}
