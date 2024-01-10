import { Button } from '@/components/ui/button'
import { Agent } from '@/data/clients/agentsClient'
import { useUpdateApprovalStatusMutation } from '@/data/hooks/useAgentsClient'
import { DialogClose, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ApprovalStatusEnum } from '@/constants/enums'

interface Props {
  data: Agent
}

const AgentApprovalStatusForm = ({ data }: Props) => {
  const { mutate: updateAgentApprovalStatus, isPending: isLoading } = useUpdateApprovalStatusMutation()

  function onAgentApprove() {
    updateAgentApprovalStatus({
      id: data?.id,
      approvalStatus: ApprovalStatusEnum.APPROVED
    })
  }

  return (
    <>
      <DialogFooter className="sm:justify-end">
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Close
          </Button>
        </DialogClose>
        <Button disabled={isLoading} onClick={onAgentApprove}>
          Yes I am sure
        </Button>
      </DialogFooter>
    </>
  )
}

export default AgentApprovalStatusForm
