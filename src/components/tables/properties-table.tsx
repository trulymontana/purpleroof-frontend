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
import { PropertySubmissionStatusEnum, UserRoleEnum } from '@/constants/enums'
import { useGetUserRole } from '@/data/hooks/useAuthClient'
import { FacetOption } from './data-table/data'
import { CheckCircledIcon, CrossCircledIcon, StopwatchIcon } from '@radix-ui/react-icons'

export default function PropertiesTable() {
  const { loading: isLoading, data: agentsData } = useGetAgents()

  const { mutate: deleteProperty, isPending } = useDeletePropertyMutation()

  const userRole = useGetUserRole()
  const isAdmin = userRole === UserRoleEnum.ADMIN || userRole === UserRoleEnum.SUPER_ADMIN
  const columns: ColumnDef<Property>[] = [
    {
      accessorKey: 'id',
      header: 'ID'
    },
    {
      id: 'name',
      header: 'Name',
      cell: ({ row }) => {
        return <span className="line-clamp-1 max-w-sm">{row.original.name}</span>
      }
    },
    {
      accessorKey: 'email',
      header: 'Email'
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
      accessorKey: 'locationId',
      header: 'Location'
    },
    {
      accessorKey: 'landmark',
      header: 'Landmark'
    },
    {
      id: 'createdAt',
      header: 'Created',
      cell: ({ row }) => {
        const createdAt = row.original.createdAt
        return new Date(createdAt).toLocaleDateString()
      }
    },
    {
      id: 'updatedAt',
      header: 'Updated',
      cell: ({ row }) => {
        const updatedAt = row.original.createdAt
        return new Date(updatedAt).toLocaleDateString()
      }
    },
    {
      id: 'submissionStatus',
      header: 'Submission Status',
      accessorKey: 'submissionStatus',
      cell: ({ row }) => {
        const data = row.original
        if (data.submissionStatus === PropertySubmissionStatusEnum.REJECTED) {
          return <Badge className={`bg-red-500 text-white hover:bg-red-400`}>{data.submissionStatus}</Badge>
        }
        return (
          <Badge
            variant="outline"
            className={`uppercase ${data.submissionStatus === PropertySubmissionStatusEnum.APPROVED ? 'bg-teal-600 text-white' : ''
              }`}
          >
            {data.submissionStatus === PropertySubmissionStatusEnum.SUBMITTED
              ? 'Waiting For approval'
              : data.submissionStatus}
          </Badge>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      }
    },
    {
      id: 'agent',
      header: 'Agent',
      cell: ({ row }) => {
        const data = row.original
        if (data?.agentId) {
          return <Badge className="bg-teal-600">Assigned</Badge>
        }
        return (
          <Badge variant="outline" className="bg-red-500 text-white">
            Not Assigned
          </Badge>
        )
      }
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => (
        <div className="flex items-center">
          <Link href={PageRoutes.dashboard.PROPERTY_DETAILS(row.original.id)}>
            <Button variant="ghost">
              <Eye size={17} color="black" />
            </Button>
          </Link>
          {isAdmin && (
            <ConfirmActionDialog
              title="Edit Property"
              anchor={
                <Button variant="ghost">
                  <FileEdit size={17} color="black" />
                </Button>
              }
              content={<UpdatePropertyForm data={row.original} />}
            />
          )}
          {isAdmin && <ConfirmDeleteDialog onDelete={() => deleteProperty(row.original.id)} isLoading={isPending} />}
        </div>
      )
    }
  ]

  if (isAdmin) {
    columns.push({
      id: 'action',
      header: 'Action',
      cell: ({ row }) => (
        <>
          {row.original.submissionStatus === PropertySubmissionStatusEnum.APPROVED && (
            <ConfirmActionDialog
              title={row.original?.agentId ? 'Change Agent' : 'Assign Agent'}
              anchor={<Button>{row.original?.agentId ? 'Change Agent' : 'Assign Agent'}</Button>}
              content={<AssignAgentForm agentsData={agentsData} data={row.original} />}
            />
          )}
        </>
      )
    })
  }

  const propertyFilterOptions: FacetOption[] = [
    {
      label: 'Approved',
      value: PropertySubmissionStatusEnum.APPROVED,
      icon: CheckCircledIcon
    },
    {
      label: 'Pending',
      value: PropertySubmissionStatusEnum.SUBMITTED,
      icon: StopwatchIcon
    },
    {
      label: 'Rejected',
      value: PropertySubmissionStatusEnum.REJECTED,
      icon: CrossCircledIcon
    }
  ]

  const { loading, data } = useGetProperties()
  return (
    <DataTable
      columns={columns}
      data={data ?? []}
      isLoading={loading}
      filterKey='name'
      facetKey={'submissionStatus'}
      facetOptions={propertyFilterOptions}
    />
  )
}
