import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon
} from '@radix-ui/react-icons'

export const labels = [
  {
    value: 'bug',
    label: 'Bug'
  },
  {
    value: 'feature',
    label: 'Feature'
  },
  {
    value: 'documentation',
    label: 'Documentation'
  }
]

export const statuses = [
  {
    value: 'pending',
    label: 'Pending',
    icon: StopwatchIcon
  },
  {
    value: 'completed',
    label: 'Completed',
    icon: CheckCircledIcon
  },
  {
    value: 'rejected',
    label: 'Rejected',
    icon: CrossCircledIcon
  }
]
