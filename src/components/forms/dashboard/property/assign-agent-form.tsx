import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import SelectElement from '@/components/forms/elements/select-element'
import { Button } from '@/components/ui/button'
import { ApprovalStatusEnum } from '@/constants/enums'
import { useAssignAgentMutation } from '@/data/hooks/usePropertiesClient'
import { Property } from '@/data/clients/propertiesClient'
import { useEffect, useState } from 'react'
import { TOption } from '@/constants/types'
import { useGetAgents } from '@/data/hooks/useAgentsClient'

interface Props {
  data: Property
}

const formSchema = z.object({
  agentId: z.string({
    required_error: 'Please select a agent!'
  })
})

type TAgent = z.infer<typeof formSchema>
const AssignAgentForm = ({ data }: Props) => {
  const { data: agentsData } = useGetAgents()
  const [agentOptions, setAgentOptions] = useState<TOption[]>()
  const { mutate: assignAgent, isPending: isLoading } = useAssignAgentMutation()

  useEffect(() => {
    if (agentsData && agentsData?.length > 0) {
      let options: TOption[] = []
      agentsData?.map((agent) => {
        if (agent.approvalStatus === ApprovalStatusEnum.APPROVED) {
          options.push({
            label: `${agent.user.firstName} ${agent.user.lastName} ${agent?.agency ?? '-'} ${agent.agency}`,
            value: agent.id.toString()
          })
        }
      })
      setAgentOptions(options)
    }
  }, [agentsData])

  const form = useForm<TAgent>({
    resolver: zodResolver(formSchema)
  })

  function onSubmit(values: TAgent) {
    assignAgent({
      id: data.id,
      ...values
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 p-4">
        <SelectElement name="agentId" placeholder="Please select a agent" label="Agent" options={agentOptions || []} />
        <Button className="w-full" disabled={isLoading} type="submit">
          {isLoading ? 'Saving...' : 'Save changes'}
        </Button>
      </form>
    </Form>
  )
}

export default AssignAgentForm
