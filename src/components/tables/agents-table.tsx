'use client'

import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from './data-table'
import { Badge } from '../ui/badge'
import ConfirmActionDialog from '../dialogs/confirm-action-dialog'
import { Button } from '../ui/button'
import ConfirmDeleteDialog from '../dialogs/confirm-delete-dialog'
import { useDeleteAgentMutation, useGetAgents } from '@/data/hooks/useAgentsClient'
import { Agent } from '@/data/clients/agentsClient'
import { ActiveStatusEnum, ApprovalStatusEnum } from '@/constants/enums'
import AgentApprovalStatusForm from '@/app/dashboard/admin/agents/_forms/approval-status-form'
import AgentActiveStausForm from '@/app/dashboard/admin/agents/_forms/active-status-form'
import Link from 'next/link'
import { DownloadIcon, Eye } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'

export default function AgentsTable() {

    // const { mutate: deleteAgent, isPending } = useDeleteAgentMutation()

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
            id: 'locations',
            header: 'Locations',
            cell: ({ row }) => {
                const locations = row.original.locations
                return (
                    <div className='flex items-center gap-2'>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline">View Locations</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[800px]">
                                <DialogHeader>
                                    <DialogTitle>Locations</DialogTitle>
                                    <DialogDescription>
                                        Locations where agent is available.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid grid-cols-3 gap-4 py-4 overflow-y-auto max-h-[500px]">
                                    {
                                        locations.map((location, i) => {
                                            return (
                                                <Card key={i} className="">
                                                    <CardHeader>
                                                        <CardTitle>{location.name}</CardTitle>
                                                    </CardHeader>
                                                </Card>
                                            )
                                        })
                                    }
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                )
            }
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
            id: 'activeStatus',
            header: 'Active Status',
            cell: ({ row }) => {
                const activeStatus = row.original.activeStatus
                if (activeStatus === ActiveStatusEnum.ACTIVE) {
                    return <Badge className={`bg-green-400 hover:bg-green-600 text-black`}>Active</Badge>
                }
                return <Badge className={`bg-red-400 hover:bg-red-600 text-black`}>Inactive</Badge>
            }
        },
        {
            id: 'approvalStatus',
            header: 'Approved Status',
            cell: ({ row }) => {
                const approvalStatus = row.original.approvalStatus
                if (approvalStatus === ApprovalStatusEnum.APPROVED) {
                    return <Badge className={`bg-green-400 hover:bg-green-600 text-black`}>Approved</Badge>
                }
                return <Badge className={`bg-red-400 hover:bg-red-600 text-black`}>Not Approved</Badge>
            }
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
            id: 'action',
            header: 'Action',
            cell: ({ row }) => (
                <div className='space-x-2'>
                    <ConfirmActionDialog
                        title="Update Status"
                        anchor={
                            <Button>Update Active Status</Button>
                        }
                        content={<AgentActiveStausForm data={row.original} />}
                    />
                    {row.original.approvalStatus === ApprovalStatusEnum.NOT_APPROVED && <ConfirmActionDialog
                        title="Update Status"
                        anchor={
                            <Button>Approve Agent</Button>
                        }
                        content={<AgentApprovalStatusForm data={row.original} />}
                    />}
                </div>
            )
        },
        // {
        //     id: 'actions',
        //     enableHiding: false,
        //     cell: ({ row }) => (
        //         <div className="flex items-center gap-4">
        //             <ConfirmDeleteDialog onDelete={() => deleteAgent(row.original.id)} isLoading={isPending} />
        //         </div>
        //     )
        // }
    ]


    const { loading, data } = useGetAgents()

    return <DataTable columns={columns} data={data ?? []} isLoading={loading} />
}
