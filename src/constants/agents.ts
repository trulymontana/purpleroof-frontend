import { ActiveStatusEnum, ApprovalStatusEnum } from './enums'

export const approvalStatusOptions = [
  {
    label: 'Approved',
    value: ApprovalStatusEnum.APPROVED
  },
  {
    label: 'Not Approved',
    value: ApprovalStatusEnum.NOT_APPROVED
  }
]

export const activeStatusOptions = [
  {
    label: 'Active',
    value: ActiveStatusEnum.ACTIVE
  },
  {
    label: 'Inactive',
    value: ActiveStatusEnum.INACTIVE
  }
]
