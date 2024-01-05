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

export default function RequirementsTable() {

  const { mutate: deleteRequirement, isPending: isLoading } = useDeleteRequirementMutation()

  const columns: ColumnDef<RequirementApplication>[] = [
    {
      accessorKey: 'id',
      header: 'Id'
    },
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
      accessorKey: 'preApprovalFee',
      header: 'Pre Approval Fee (AED)'
    },
    {
      accessorKey: 'processingFee',
      header: 'Processing Fee (%)'
    },
    {
      accessorKey: 'lifeInsurance',
      header: 'Life Insurance (%)'
    },
    {
      accessorKey: 'propertyInsurance',
      header: 'Property Insurance (%)'
    },
    {
      accessorKey: 'valuationFee',
      header: 'Valuation Fee(AED)'
    },
    {
      accessorKey: 'rate',
      header: 'Rate (%)'
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
      id: 'createdAt',
      header: 'Created At',
      cell: ({ row }) => {
        const createdAt = row.original.createdAt
        return new Date(createdAt).toLocaleDateString()
      }
    },
    {
      id: 'updatedAt',
      header: 'Updated At',
      cell: ({ row }) => {
        const updatedAt = row.original.createdAt
        return new Date(updatedAt).toLocaleDateString()
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
  return <DataTable columns={columns} data={data ?? []} isLoading={loading} />
}
