import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

import React from 'react'
import { Button } from '../ui/button'
import { Trash2 } from 'lucide-react'
import { DialogClose } from '@radix-ui/react-dialog'

interface Props {
  onDelete: () => void
  isLoading: boolean
}

const ConfirmDeleteDialog = ({ onDelete, isLoading }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'ghost'}>
          <Trash2 color="red" size={17} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{'Are you sure you want to delete this?'}</DialogTitle>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button variant="destructive" disabled={isLoading} onClick={onDelete}>
            Yes I am sure
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmDeleteDialog
