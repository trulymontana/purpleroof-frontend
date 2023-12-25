'use client'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from './data-table'
import { Property } from '@/constants/types'
import { useGetProperties } from '@/data/hooks/usePropertiesClient'
import ActionButtons from './action-buttons'
import Link from 'next/link'
import { Badge } from '../ui/badge'

export const columns: ColumnDef<Property>[] = [
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
    accessorKey: 'amount',
    header: 'Amount'
  },
  {
    accessorKey: 'size',
    header: 'Size'
  },
  // {
  //   accessorKey: 'numberOfBedRooms',
  //   header: 'Number of Bedrooms'
  // },
  // {
  //   accessorKey: 'numberOfBathRooms',
  //   header: 'Number of Bathrooms'
  // },
  // {
  //   accessorKey: 'maintenanceFee',
  //   header: 'Maintenance Fee'
  // },
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
    id: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const data = row.original
      return <Badge>{data.status}</Badge>
    }
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => <ActionButtons row={row} />
  }
]

export default function PropertiesTable() {
  const { loading, data } = useGetProperties()
  return <DataTable columns={columns} data={data ?? []} isLoading={loading} />
}
