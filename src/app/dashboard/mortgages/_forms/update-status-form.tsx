import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { MortgageApplication } from '@/constants/types'
import { Form } from '@/components/ui/form'
import SelectElement from '@/components/forms/elements/select-element'
import { Button } from '@/components/ui/button'
import { useUpdateMortgageMutation } from '@/data/hooks/useMortgageClient'
import { MortgageStatusEnum } from '@/constants/enums'
import { mortgageSubmissionStatuses } from '@/constants/mortgage'

interface Props {
  data: MortgageApplication
}

const formSchema = z.object({
  status: z.nativeEnum(MortgageStatusEnum, {
    required_error: 'Please select a status!'
  })
})

type TMortgageStatus = z.infer<typeof formSchema>
const UpdateMortgageStatusForm = ({ data }: Props) => {
  const { mutate: updateMortgage, isPending: isLoading } = useUpdateMortgageMutation()

  const form = useForm<TMortgageStatus>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: data?.status
    }
  })

  function onSubmit(values: TMortgageStatus) {
    updateMortgage({
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
          options={mortgageSubmissionStatuses}
        />
        <Button disabled={isLoading} type="submit">{isLoading ? "Saving..." : "Save changes"}</Button>
      </form>
    </Form>
  )
}

export default UpdateMortgageStatusForm
