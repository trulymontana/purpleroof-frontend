import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Card, CardHeader, CardTitle } from '../ui/card'

interface Props {
  title: string
  data: { name: string }[]
  anchor: React.ReactNode
  description?: string
}


const ViewDetailsDialog = ({ title, anchor, data, description }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{anchor}</DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="grid max-h-[500px] grid-cols-3 gap-4 overflow-y-auto py-4">
          {data.map((data: { name: string }, i: number) => {
            return (
              <Card key={i} className="">
                <CardHeader>
                  <CardTitle>{data.name}</CardTitle>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>


  )
}

export default ViewDetailsDialog