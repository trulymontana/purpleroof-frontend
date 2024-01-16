import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'
import { Eye, FileEdit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUpdatePropertyMutation } from '@/data/hooks/usePropertiesClient'
import { Property } from '@/constants/types'

import UpdateMortgageStatusForm from '@/components/forms/dashboard/mortgage/update-status-form'
import ConfirmDialog from '../dialogs/confirm-action-dialog'

interface Props {
  row: any
}

const formSchema = z.object({
  status: z.string()
})

type TPropertyStatus = z.infer<typeof formSchema>
const ActionButtons = ({ row }: Props) => {
  const { mutate: updateProperty } = useUpdatePropertyMutation()

  const pathname = usePathname()
  const data: Property = row.original

  const form = useForm<TPropertyStatus>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: data?.status
    }
  })

  function onSubmit(values: TPropertyStatus) {
    updateProperty({
      id: data?.id,
      ...values
    })
  }

  return (
    <div className="flex items-center gap-1">
      <Link href={`${pathname}/${data.id}`}>
        <Eye size={17} color="black" />
      </Link>

      <ConfirmDialog
        title="Edit property"
        anchor={
          <Button variant="ghost">
            <FileEdit size={17} color="black" />
          </Button>
        }
        content={<UpdateMortgageStatusForm data={row.original} />}
      />

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost">
            <FileEdit size={17} color="black" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit property</DialogTitle>
          </DialogHeader>

          <UpdateMortgageStatusForm data={row.original} />
        </DialogContent>
      </Dialog>
      <Button variant={'ghost'}>
        <Trash2 color="red" size={17} />
      </Button>
    </div>
  )
}

export default ActionButtons
