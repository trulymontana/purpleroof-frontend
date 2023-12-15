'use client'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from './data-table'
import { RequirementApplication } from '@/constants/types'
import { useGetRequirements } from '@/data/hooks/useRequirementsClient'

export const columns: ColumnDef<RequirementApplication>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'requirements',
    header: 'Requirements'
  }
]

export default function RequirementsTable() {
  const { loading, data } = useGetRequirements()
  return <DataTable columns={columns} data={data ?? []} isLoading={loading} />
}