'use client'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from './data-table'
import { useDeletePropertyMutation, useGetProperties } from '@/data/hooks/usePropertiesClient'
import { Badge } from '../ui/badge'
import Link from 'next/link'
import { PageRoutes } from '@/constants/page-routes'
import { Eye, FileEdit } from 'lucide-react'
import ConfirmActionDialog from '../dialogs/confirm-action-dialog'
import { Button } from '../ui/button'
import ConfirmDeleteDialog from '../dialogs/confirm-delete-dialog'
import UpdatePropertyForm from '@/app/dashboard/properties/_forms/update-property-form'
import { Property } from '@/data/clients/propertiesClient'
import currency from '@/lib/currency'
import AssignAgentForm from '@/app/dashboard/properties/_forms/assign-agent-form'
import { useGetAgents } from '@/data/hooks/useAgentsClient'

export default function PropertiesTable() {

  const { loading: isLoading, data: agentsData } = useGetAgents();

  const { mutate: deleteProperty, isPending } = useDeletePropertyMutation()

  const columns: ColumnDef<Property>[] = [
    {
      accessorKey: 'id',
      header: 'ID'
    },
    {
      accessorKey: 'name',
      header: 'Name'
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
      accessorKey: 'landmark',
      header: 'Landmark'
    },
    {
      id: 'createdAt',
      header: 'Created At',
      cell: ({ row }) => {
        const createdAt = row.original.createdAt;
        return new Date(createdAt).toLocaleDateString()
      }
    },
    {
      id: 'updatedAt',
      header: 'Updated At',
      cell: ({ row }) => {
        const updatedAt = row.original.createdAt;
        return new Date(updatedAt).toLocaleDateString()
      }
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
      id: 'agent',
      header: 'Agent',
      cell: ({ row }) => (
        <>
          <ConfirmActionDialog
            title="Assign Agent"
            anchor={
              <Button>
                Assign Agent
              </Button>
            }
            content={<AssignAgentForm isLoading={isLoading} agentsData={agentsData} data={row.original} />}
          />
        </>
      )
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => (
        <div className="flex items-center">
          <Link prefetch={false} href={PageRoutes.dashboard.PROPERTY_DETAILS(row.original.id)}>
            <Button variant="ghost">
              <Eye size={17} color="black" />
            </Button>
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
