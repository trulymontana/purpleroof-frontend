'use client'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from './data-table'
import { MortgageApplication } from '@/constants/types'
import { useDeleteMortgageMutation, useGetMortgages } from '@/data/hooks/useMortgageClient'
import Link from 'next/link'
import { Badge } from '../ui/badge'
import { MortgageStatusEnum } from '@/constants/enums'
import { PageRoutes } from '@/constants/page-routes'
import { Button } from '../ui/button'
import { Eye, FileEdit } from 'lucide-react'
import UpdateMortgageStatusForm from '@/app/dashboard/mortgages/_forms/update-status-form'
import ConfirmActionDialog from '../dialogs/confirm-action-dialog'
import ConfirmDeleteDialog from '../dialogs/confirm-delete-dialog'

export default function MortgagesTable() {
  const { mutate: deleteMortgage, isPending } = useDeleteMortgageMutation()

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
    // {
    //   accessorKey: 'intendedProperty',
    //   header: 'Intended Property'
    // },
    {
      accessorKey: 'monthlyIncome',
      header: 'Monthly Income'
    },
    // {
    //   accessorKey: 'createdAt',
    //   header: 'Created At'
    // },
    // {
    //   accessorKey: 'updatedAt',
    //   header: 'Updated At'
    // },
    {
      id: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const data = row.original
        return <Badge variant="outline">{data.status}</Badge>
      }
    },
    {
      accessorKey: 'country',
      header: 'Country'
    },
    {
      id: 'action',
      header: 'Action',
      cell: ({ row }) => {
        const data = row.original
        if (data.status === MortgageStatusEnum.SUBMITTED) {
          return (
            <Link href={PageRoutes.dashboard.MORTGAGE_DETAILS(data.id)}>
              <Badge>Complete Your Application</Badge>
            </Link>
          )
        }
      }
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => (
        <div className="flex items-center gap-4">
          <Link href={PageRoutes.dashboard.MORTGAGE_DETAILS(row.original.id)}>
            <Eye size={17} color="black" />
          </Link>
          <ConfirmActionDialog
            title="Edit Mortgage"
            anchor={
              <Button variant="ghost">
                <FileEdit size={17} color="black" />
              </Button>
            }
            content={<UpdateMortgageStatusForm data={row.original} />}
          />
          <ConfirmDeleteDialog onDelete={() => deleteMortgage(row.original.id)} isLoading={isPending} />
        </div>
      )
    }
  ]

  const { loading, data } = useGetMortgages()
  return <DataTable columns={columns} data={data ?? []} isLoading={loading} />
}
