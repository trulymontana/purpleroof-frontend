'use client'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from './data-table'
import { RequirementApplication } from '@/constants/types'
import { useGetRequirements } from '@/data/hooks/useRequirementsClient'
import { Button } from '../ui/button'
import { FileEdit, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { PageRoutes } from '@/constants/page-routes'

const ActionButtons = ({ row }: { row: any }) => {
  const router = useRouter();
  const requirement = row.original;

  return (
    <div className='flex items-center gap-2'>
      <Button variant={"link"} onClick={() => router.push(`${PageRoutes.admin.REQUIREMENTS}/${requirement.id}`)}><FileEdit size={17} color='black' /></Button>
      <Button variant={"ghost"}><Trash2 color='red' size={17} /> </Button>
    </div>
  )
};

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
      const result = document.requiredDocuments.map((item: any) => item.name).join(', ');
      return (
        <div>{result}</div>
      )
    }
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <ActionButtons row={row} />
  }
]

export default function RequirementsTable() {
  const { loading, data } = useGetRequirements()
  return <DataTable columns={columns} data={data ?? []} isLoading={loading} />
}