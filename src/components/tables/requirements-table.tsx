'use client'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from './data-table'
import { RequirementApplication } from '@/constants/types'
import { useGetRequirements } from '@/data/hooks/useRequirementsClient'
import { Badge } from '../ui/badge'

import ActionButtons from './action-buttons'
import Link from 'next/link'
import { PageRoutes } from '@/constants/page-routes'
import { Eye } from 'lucide-react'
import ConfirmDeleteDialog from '../dialogs/confirm-delete-dialog'

export const columns: ColumnDef<RequirementApplication>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'incomeProfile',
    header: 'Income Profile'
  },
  {
    accessorKey: 'residenceType',
    header: 'Residence Type'
  },
  {
    header: 'Requirement Documents',
    cell: ({ row }) => {
      const document = row.original
      const result = document.requiredDocuments.map((item: any, i: number) => (
        <Badge key={i}>{item.documentType}</Badge>
      ))
      return <div className="flex items-center gap-2">{result}</div>
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
        {/* <ConfirmActionDialog
          title="Edit Property"
          anchor={
            <Button variant="ghost">
              <FileEdit size={17} color="black" />
            </Button>
          }
          content={<UpdatePropertyForm data={row.original} />}
        /> */}
        <ConfirmDeleteDialog onDelete={() => { }} isLoading />
      </div>
    )
  }
]

export default function RequirementsTable() {
  const { loading, data } = useGetRequirements()
  return <DataTable columns={columns} data={data ?? []} isLoading={loading} />
}
