'use client'

import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from './data-table'
import { Badge } from '../ui/badge'
import ConfirmActionDialog from '../dialogs/confirm-action-dialog'
import { Button } from '../ui/button'
import { useDeleteAgentMutation, useGetAgents } from '@/data/hooks/useAgentsClient'
import { Agent } from '@/data/clients/agentsClient'
import { ActiveStatusEnum, ApprovalStatusEnum } from '@/constants/enums'
import AgentApprovalStatusForm from '@/app/dashboard/admin/agents/_forms/approval-status-form'
import AgentActiveStausForm from '@/app/dashboard/admin/agents/_forms/active-status-form'
import Link from 'next/link'
import { DownloadIcon, Eye } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Card, CardHeader, CardTitle } from '../ui/card'
import ConfirmDeleteDialog from '../dialogs/confirm-delete-dialog'

export default function AgentsTable() {
  const { mutate: deleteAgent, isPending } = useDeleteAgentMutation()

  const columns: ColumnDef<Agent>[] = [
    {
      accessorKey: 'id',
      header: 'ID'
    },
    {
      accessorKey: 'agency',
      header: 'Agency Name'
    },
    {
      accessorKey: 'contactNumber',
      header: 'Contact Number'
    },
    {
      id: 'activeStatus',
      header: 'Active Status',
      cell: ({ row }) => {
        const activeStatus = row.original.activeStatus
        if (activeStatus === ActiveStatusEnum.ACTIVE) {
          return <Badge className={`bg-teal-400 text-black hover:bg-teal-600`}>Active</Badge>
        }
        return <Badge className={`bg-rose-400 text-black hover:bg-rose-600`}>Inactive</Badge>
      }
    },
    {
      id: 'approvalStatus',
      header: 'Approved Status',
      cell: ({ row }) => {
        const approvalStatus = row.original.approvalStatus
        if (approvalStatus === ApprovalStatusEnum.APPROVED) {
          return <Badge className={`bg-teal-400 text-black hover:bg-green-600`}>Approved</Badge>
        }
        return <Badge className={`bg-red-400 text-black hover:bg-red-600`}>Not Approved</Badge>
      }
    },
    {
      id: 'locations',
      header: 'Locations',
      cell: ({ row }) => {
        const locations = row.original.locations
        return (
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">View Locations</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                  <DialogTitle>Locations</DialogTitle>
                  <DialogDescription>Locations where agent is available.</DialogDescription>
                </DialogHeader>
                <div className="grid max-h-[500px] grid-cols-3 gap-4 overflow-y-auto py-4">
                  {locations.map((location, i) => {
                    return (
                      <Card key={i} className="">
                        <CardHeader>
                          <CardTitle>{location.name}</CardTitle>
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
      id: 'action',
      header: 'Action',
      cell: ({ row }) => (
        <div className="space-x-2">
          <ConfirmActionDialog
            title="Update Status"
            anchor={<Button>Update Active Status</Button>}
            content={<AgentActiveStausForm data={row.original} />}
          />
          {row.original.approvalStatus === ApprovalStatusEnum.NOT_APPROVED && (
            <ConfirmActionDialog
              title="Are you sure you want to approve this agent?"
              anchor={<Button>Approve Agent</Button>}
              content={<AgentApprovalStatusForm data={row.original} />}
            />
          )}
        </div>
      )
    },
    {
      id: 'realEstateLicense',
      header: 'Real Estate License',
      cell: ({ row }) => {
        const documentLink = row.original.documents[0].url
        return (
          <Link href={documentLink}>
            <Button className="flex items-center">
              <DownloadIcon className="mr-2 h-4 w-4" />
              Download
            </Button>
          </Link>
        )
      }
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => (
        <div className="flex items-center gap-4">
          <ConfirmDeleteDialog onDelete={() => deleteAgent(row.original.id)} isLoading={isPending} />
        </div>
      )
    }
  ]

  const { loading, data } = useGetAgents()

  return <DataTable columns={columns} data={data ?? []} isLoading={loading} />
}
