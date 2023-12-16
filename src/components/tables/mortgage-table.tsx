'use client'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from './data-table'
import { MortgageApplication } from '@/constants/types'
import { useGetMortgages } from '@/data/hooks/useMortgageClient'
import ActionButtons from './action-buttons'
import { PageRoutes } from '@/constants/page-routes'

export const columns: ColumnDef<MortgageApplication>[] = [
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
    accessorKey: 'dateOfBirth',
    header: 'Date of Birth'
  },
  {
    accessorKey: 'intendedProperty',
    header: 'Intended Property'
  },
  {
    accessorKey: 'monthlyIncome',
    header: 'Monthly Income'
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
    accessorKey: 'status',
    header: 'Status'
  },
  // {
  //   accessorKey: 'userId',
  //   header: 'User ID'
  // },
  {
    accessorKey: 'country',
    header: 'Country'
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <ActionButtons row={row} route={`${PageRoutes.dashboard.MORTGAGES}`} />
  }
]

export default function MortgagesTable() {
  const { loading, data } = useGetMortgages()
  return <DataTable columns={columns} data={data ?? []} isLoading={loading} />
}
