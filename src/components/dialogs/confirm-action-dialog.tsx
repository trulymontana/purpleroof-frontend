import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DialogClose } from '@radix-ui/react-dialog'

import React from 'react'
import { Button } from '../ui/button'

interface Props {
  title: string
  content: React.ReactNode
  anchor: React.ReactNode
}

const ConfirmActionDialog = ({ title, anchor, content }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{anchor}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {content}
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmActionDialog
