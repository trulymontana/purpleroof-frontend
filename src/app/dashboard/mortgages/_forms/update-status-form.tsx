import { usePathname } from 'next/navigation'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { propertySubmissionStatuses } from '@/constants/advertise'
import { useUpdatePropertyMutation } from '@/data/hooks/usePropertiesClient'
import { MortgageApplication, Property } from '@/constants/types'
import { Form } from '@/components/ui/form'
import SelectElement from '@/components/forms/elements/select-element'
import { Button } from '@/components/ui/button'

interface Props {
  data: MortgageApplication
}

const formSchema = z.object({
  status: z.string()
})

type TPropertyStatus = z.infer<typeof formSchema>
const UpdateMortgageStatusForm = ({ data }: Props) => {
  const { mutate: updateProperty } = useUpdatePropertyMutation()

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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 p-4">
        <SelectElement
          name="status"
          placeholder="Please select a status"
          label="Status"
          options={propertySubmissionStatuses}
        />
        <Button type="submit">Save changes</Button>
      </form>
    </Form>
  )
}

export default UpdateMortgageStatusForm
