import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import SelectElement from '@/components/forms/elements/select-element'
import { Button } from '@/components/ui/button'
import { Agent } from '@/data/clients/agentsClient'
import { activeStatusOptions } from '@/constants/agents'
import { ActiveStatusEnum } from '@/constants/enums'
import { useUpdateActiveStatusMutation } from '@/data/hooks/useAgentsClient'
import { useRouter } from 'next/navigation'

interface Props {
  data: Agent
}

const formSchema = z.object({
  activeStatus: z.nativeEnum(ActiveStatusEnum, {
    required_error: 'Please select a status!'
  })
})

type TApprovalStatus = z.infer<typeof formSchema>
const AgentActiveStausForm = ({ data }: Props) => {
  const { mutate: updateAgentActiveStatus, isPending: isLoading } = useUpdateActiveStatusMutation()

  const router = useRouter()

  const form = useForm<TApprovalStatus>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      activeStatus: data?.activeStatus
    }
  })

  function onSubmit(values: TApprovalStatus) {
    updateAgentActiveStatus({
      id: data?.id,
      ...values
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 p-4">
        <SelectElement
          name="activeStatus"
          placeholder="Please select a status"
          label="Active Status"
          options={activeStatusOptions}
        />
        <Button disabled={isLoading} className="w-full" type="submit">
          {isLoading ? 'Saving...' : 'Save changes'}
        </Button>
      </form>
    </Form>
  )
}

export default AgentActiveStausForm
