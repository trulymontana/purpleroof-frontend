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
import { useGetAgents } from '@/data/hooks/useAgentsClient'
import { Agents, CreateAgentInput } from '@/data/clients/agentsClient'
import ApproveAgentForm from '@/app/dashboard/admin/agents/_forms/approval-status-form'
import { ActiveStatusEnum, ApprovalStatusEnum } from '@/constants/enums'
import AgentApprovalStatusForm from '@/app/dashboard/admin/agents/_forms/approval-status-form'
import AgentActiveStausForm from '@/app/dashboard/admin/agents/_forms/active-status-form'

export default function AgentsTable() {

    const { mutate: deleteProperty, isPending } = useDeletePropertyMutation()

    // [
    //     {
    //         "id": 1,
    //         "agency": "Bhavesh",
    //         "contactNumber": "+32131231232",
    //         "isActive": true,
    //         "isApproved": false,
    //         "userId": 9,
    //         "createdAt": "2023-12-31T17:30:30.000Z",
    //         "updatedAt": "2023-12-31T17:30:30.261Z",
    //         "user": {
    //             "id": 9,
    //             "authId": "813098dcb913dfd5e332203854c65b82",
    //             "firstName": "BHAVESH",
    //             "lastName": "YADAV",
    //             "email": "cabra@gmail.com",
    //             "password": "$2b$10$sfeJ3kDoM0Ud82E5XNGqK.0Tb9ZNK2SlvZQd1uW5g0/ZMv1iAPUwa",
    //             "isEmailConfirmed": null,
    //             "role": "ADMIN",
    //             "createdAt": "2023-12-21T12:30:29.000Z",
    //             "updatedAt": "2023-12-21T12:30:28.696Z",
    //             "agentId": null
    //         },
    //         "locations": [
    //             {
    //                 "id": 151,
    //                 "name": "5208 Muweilah Building",
    //                 "emirate": "SHARJAH",
    //                 "createdAt": "2023-09-14T08:50:34.000Z",
    //                 "updatedAt": "2023-09-14T08:50:34.000Z"
    //             },
    //             {
    //                 "id": 152,
    //                 "name": "Abu Shagara",
    //                 "emirate": "SHARJAH",
    //                 "createdAt": "2023-09-14T08:50:34.000Z",
    //                 "updatedAt": "2023-09-14T08:50:34.000Z"
    //             },
    //             {
    //                 "id": 153,
    //                 "name": "Ajmal Makan",
    //                 "emirate": "SHARJAH",
    //                 "createdAt": "2023-09-14T08:50:34.000Z",
    //                 "updatedAt": "2023-09-14T08:50:34.000Z"
    //             }
    //         ],
    //         "documents": [
    //             {
    //                 "id": 83,
    //                 "type": "REAL_ESTATE_LICENSE",
    //                 "url": "https://purpleroof.s3.amazonaws.com/agent/realEstateLicense-1704043712328-Screenshot-2023-12-25-at-4.17.28 PM.png",
    //                 "createdAt": "2023-12-31T17:30:30.000Z",
    //                 "updatedAt": "2023-12-31T17:30:30.261Z",
    //                 "mortgageId": null,
    //                 "propertyId": null,
    //                 "agentId": 1
    //             }
    //         ]
    //     }
    // ]

    const columns: ColumnDef<Agents>[] = [
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
                    return <Badge className={`bg-green-400 text-black`}>Active</Badge>
                }
                return <Badge className={`bg-red-400 text-black`}>Inactive</Badge>
            }
        },
        {
            id: 'approvalStatus',
            header: 'Approved Status',
            cell: ({ row }) => {
                const approvalStatus = row.original.approvalStatus
                if (approvalStatus === ApprovalStatusEnum.APPROVED) {
                    return <Badge className={`bg-green-400 text-black`}>Approved</Badge>
                }
                return <Badge className={`bg-red-400 text-black`}>Not Approved</Badge>
            }
        },
        {
            id: 'action',
            header: 'Action',
            cell: ({ row }) => (
                <div className='space-x-2'>
                    <ConfirmActionDialog
                        title="Edit Agent Active Status"
                        anchor={
                            <Button>Active Agent</Button>
                        }
                        content={<AgentActiveStausForm data={row.original} />}
                    />
                    <ConfirmActionDialog
                        title="Edit Agent Approval Status"
                        anchor={
                            <Button>Approve Agent</Button>
                        }
                        content={<AgentApprovalStatusForm data={row.original} />}
                    />
                </div>
            )
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
            id: 'actions',
            enableHiding: false,
            cell: ({ row }) => (
                <div className="flex items-center gap-4">
                    <ConfirmDeleteDialog onDelete={() => deleteProperty(row.original.id)} isLoading={isPending} />
                </div>
            )
        }
    ]


    const { loading, data } = useGetAgents()

    return <DataTable columns={columns} data={data ?? []} isLoading={loading} />
}
