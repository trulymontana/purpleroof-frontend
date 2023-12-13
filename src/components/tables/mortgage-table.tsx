'use client'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from './data-table'
import { MortgageApplication } from '@/constants/types'
import { useGetMortgages } from '@/data/hooks/useMortgageClient'

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
    accessorKey: 'userId',
    header: 'User ID'
  },
  {
    accessorKey: 'dialCode',
    header: 'Dial Code'
  },
  {
    accessorKey: 'country',
    header: 'Country'
  },
  {
    accessorKey: 'actions',
    header: 'Actions'
  }
]

export default function MortgagesTable() {
  const { loading, data } = useGetMortgages()
  return <DataTable columns={columns} data={data ?? []} isLoading={loading} />
}
