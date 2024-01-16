'use client'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from './data-table'
import { RequirementApplication } from '@/constants/types'
import { useDeleteRequirementMutation, useGetRequirements } from '@/data/hooks/useRequirementsClient'
import Link from 'next/link'
import { PageRoutes } from '@/constants/page-routes'
import { FileEdit } from 'lucide-react'
import ConfirmDeleteDialog from '../dialogs/confirm-delete-dialog'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Card, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { DataTableColumnHeader } from './data-table/data-table-column-header'

export default function RequirementsTable() {
  const { mutate: deleteRequirement, isPending: isLoading } = useDeleteRequirementMutation()

  const columns: ColumnDef<RequirementApplication>[] = [
    {
      accessorKey: 'id',
      header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />
    },
    {
      accessorKey: 'name',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />
    },
    {
      accessorKey: 'incomeProfile',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Income Profile" />
    },
    {
      accessorKey: 'residenceType',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Residency Type" />
    },
    {
      accessorKey: 'preApprovalFee',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Pre Approval (AED)" />
    },
    {
      accessorKey: 'processingFee',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Processing (%)" />
    },
    {
      accessorKey: 'lifeInsurance',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Life Insurance (%)" />
    },
    {
      accessorKey: 'propertyInsurance',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Property Insurance (%)" />
    },
    {
      accessorKey: 'valuationFee',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Valuation (AED)" />
    },
    {
      accessorKey: 'rate',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Rate (%)" />
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
      cell: ({ row }) => {
        const createdAt = row.original.createdAt
        return new Date(createdAt).toLocaleDateString()
      }
    },
    {
      id: 'requiredDocuments',
      header: 'Requirement Documents',
      cell: ({ row }) => {
        const document = row.original
        return (
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">View Documents</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                  <DialogTitle>Required Documents</DialogTitle>
                </DialogHeader>
                <div className="grid max-h-[500px] grid-cols-2 gap-4 overflow-y-auto py-4">
                  {document.requiredDocuments.map((document, i) => {
                    return (
                      <Card key={i}>
                        <CardHeader>
                          <CardTitle>{document.name}</CardTitle>
                        </CardHeader>
                      </Card>
                    )
                  })}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )
      }
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => (
        <div className="flex items-center">
          <Link href={PageRoutes.dashboard.admin.REQUIREMENTS_EDIT(row.original.id)}>
            <Button variant="ghost">
              <FileEdit size={17} color="black" />
            </Button>
          </Link>
          <ConfirmDeleteDialog onDelete={() => deleteRequirement(row.original.id)} isLoading={isLoading} />
        </div>
      )
    }
  ]

  const { loading, data } = useGetRequirements()

  return <DataTable columns={columns} data={data ?? []} isLoading={loading} filterKey="name" />
}
