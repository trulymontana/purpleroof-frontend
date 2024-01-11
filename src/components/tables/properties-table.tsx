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
import UpdatePropertyForm from '@/components/forms/dashboard/property/update-property-form'
import { Property } from '@/data/clients/propertiesClient'
import currency from '@/lib/currency'
import AssignAgentForm from '@/components/forms/dashboard/property/assign-agent-form'
import { useGetAgents } from '@/data/hooks/useAgentsClient'
import { CallPreferenceEnum, PropertySubmissionStatusEnum, UserRoleEnum } from '@/constants/enums'
import { useGetUserRole } from '@/data/hooks/useAuthClient'
import { FacetOption } from './data-table/data'
import { CheckCircledIcon, CrossCircledIcon, StopwatchIcon } from '@radix-ui/react-icons'
import { DataTableColumnHeader } from './data-table/data-table-column-header'
import UpdateNumberForm from '@/components/forms/dashboard/property/update-number-form'

export default function PropertiesTable() {

  const { data: agentsData } = useGetAgents()
  const { mutate: deleteProperty, isPending } = useDeletePropertyMutation()

  const userRole = useGetUserRole()
  const isAdmin = userRole === UserRoleEnum.ADMIN || userRole === UserRoleEnum.SUPER_ADMIN
  const columns: ColumnDef<Property>[] = [
    {
      accessorKey: 'id',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID" />
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => {
        return <span className="line-clamp-1 max-w-sm">{row.original.name}</span>
      }
    },
    {
      accessorKey: 'email',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
    },
    {
      accessorKey: 'phone',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Phone" />
      ),
      cell: ({ row }) => {
        const data = row.original;
        if (data.callPreference === CallPreferenceEnum.PURPLEROOF) {
          return (
            <span>{data.phone}</span>
          )
        }
        return <span>{data.phone}</span>
      }
    },
    {
      accessorKey: 'amount',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Amount" />
      ),
      cell: ({ row }) => {
        const monthlyIncome = row.original.amount
        return <span>{currency.format(monthlyIncome)}</span>
      }
    },
    {
      accessorKey: 'landmark',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Landmark" />
      ),
    },
    {
      accessorKey: 'callPreference',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Call Preference" />
      )
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created At" />
      ),
      cell: ({ row }) => {
        const createdAt = row.original.createdAt
        return new Date(createdAt).toLocaleDateString()
      }
    },
    {
      accessorKey: 'submissionStatus',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Submission Status" />
      ),
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
      accessorKey: 'agent',
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
      cell: ({ row }) => {
        return (
          <div className="flex items-center space-x-2">
            <Link href={PageRoutes.dashboard.PROPERTY_DETAILS(row.original.id)}>
              <Button size="sm">
                View Details
              </Button>
            </Link>
            <Link href={PageRoutes.dashboard.EDIT_PROPERTY(row.original.id)}>
              <Button size="sm">
                Edit Property
              </Button>
            </Link>
          </div>
        )
      }
    }
  ]

  if (isAdmin) {
    columns.push(
      {
        id: 'changeAgent',
        cell: ({ row }) => {
          return (
            <div className='flex items-center gap-1'>
              {row.original.submissionStatus === PropertySubmissionStatusEnum.APPROVED && (
                <ConfirmActionDialog
                  title={row.original?.agentId ? 'Change Agent' : 'Assign Agent'}
                  anchor={<Button variant="outline" size="sm">{row.original?.agentId ? 'Change Agent' : 'Assign Agent'}</Button>}
                  content={<AssignAgentForm agentsData={agentsData} data={row.original} />}
                />
              )}
              {
                row.original.callPreference === CallPreferenceEnum.PURPLEROOF && (<ConfirmActionDialog
                  title="Update Number"
                  anchor={<Button variant="outline" size="sm">Update Number</Button>}
                  content={<UpdateNumberForm data={row.original} />}
                />)
              }
            </div>
          )
        }
      },
      {
        id: 'adminActions',
        cell: ({ row }) => (
          <div className='flex items-center'>
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
    )
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
