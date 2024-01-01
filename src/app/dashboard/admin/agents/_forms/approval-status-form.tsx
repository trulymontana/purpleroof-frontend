import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import SelectElement from '@/components/forms/elements/select-element'
import { Button } from '@/components/ui/button'
import { Agent } from '@/data/clients/agentsClient'
import { approvalStatusOptions } from '@/constants/agents'
import { ApprovalStatusEnum } from '@/constants/enums'
import { useUpdateApprovalStatus } from '@/data/hooks/useAgentsClient'

interface Props {
    data: Agent
}

const formSchema = z.object({
    approvalStatus: z.nativeEnum(ApprovalStatusEnum, {
        required_error: "Please select a status!"
    })
})

type TApprovalStatus = z.infer<typeof formSchema>
const AgentApprovalStatusForm = ({ data }: Props) => {
    const { mutate: updateAgentApprovalStatus } = useUpdateApprovalStatus()

    const form = useForm<TApprovalStatus>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            approvalStatus: data?.approvalStatus
        }
    })

    function onSubmit(values: TApprovalStatus) {
        updateAgentApprovalStatus({
            id: data?.id,
            ...values
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 p-4">
                <SelectElement
                    name="approvalStatus"
                    placeholder="Please select a status"
                    label="Approval Status"
                    options={approvalStatusOptions}
                />
                <Button type="submit">Save changes</Button>
            </form>
        </Form>
    )
}

export default AgentApprovalStatusForm
