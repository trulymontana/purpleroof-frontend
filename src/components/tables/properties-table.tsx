'use client'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from './data-table'
import { useDeletePropertyMutation, useGetProperties } from '@/data/hooks/usePropertiesClient'
import { Badge } from '../ui/badge'
import { PropertySubmissionStatusEnum } from '@/constants/enums'
import Link from 'next/link'
import { PageRoutes } from '@/constants/page-routes'
import { Eye, FileEdit } from 'lucide-react'
import ConfirmActionDialog from '../dialogs/confirm-action-dialog'
import { Button } from '../ui/button'
import ConfirmDeleteDialog from '../dialogs/confirm-delete-dialog'
import UpdatePropertyForm from '@/app/dashboard/properties/_forms/update-property-form'
import { Property } from '@/data/clients/propertiesClient'
import currency from '@/lib/currency'

export default function PropertiesTable() {

  const { mutate: deleteProperty, isPending } = useDeletePropertyMutation()

  const columns: ColumnDef<Property>[] = [
    {
      accessorKey: 'id',
      header: 'ID'
    },
    // {
    //   accessorKey: 'propertyTypeId',
    //   header: 'Property Type ID'
    // },
    // {
    //   accessorKey: 'propertyTypeCategoryId',
    //   header: 'Property Type Category ID'
    // },
    {
      accessorKey: 'name',
      header: 'Name'
    },
    {
      accessorKey: 'description',
      header: 'Description'
    },
    {
      accessorKey: 'phone',
      header: 'Phone'
    },
    {
      id: 'amount',
      header: 'Amount',
      cell: ({ row }) => {
        const monthlyIncome = row.original.amount
        return <span>{currency.format(monthlyIncome)}</span>
      }
    },
    {
      accessorKey: 'size',
      header: 'Size'
    },
    {
      accessorKey: 'address',
      header: 'Address'
    },
    {
      accessorKey: 'landmark',
      header: 'Landmark'
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At'
    },
    {
      accessorKey: 'updatedAt',
      header: 'Updated At'
    },
    {
      id: "status",
      header: 'Status',
      cell: ({ row }) => {
        const data = row.original;
        return <Badge>{data.submissionStatus}</Badge>
      }
    },
    {
      id: 'action',
      header: 'Action',
      cell: ({ row }) => {
        const data = row.original
        if (data.status === PropertySubmissionStatusEnum.SUBMITTED) {
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
          <Link href={PageRoutes.dashboard.PROPERTY_DETAILS(row.original.id)}>
            <Eye size={17} color="black" />
          </Link>
          <ConfirmActionDialog
            title="Edit Property"
            anchor={
              <Button variant="ghost">
                <FileEdit size={17} color="black" />
              </Button>
            }
            content={<UpdatePropertyForm data={row.original} />}
          />
          <ConfirmDeleteDialog onDelete={() => deleteProperty(row.original.id)} isLoading={isPending} />
        </div>
      )
    }
  ]


  const { loading, data } = useGetProperties()
  return <DataTable columns={columns} data={data ?? []} isLoading={loading} />
}
