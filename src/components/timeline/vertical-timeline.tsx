import { historyType } from '@/constants/types'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'

interface Props {
  options: historyType[]
}

const VerticalTimelineComponent = ({ options }: Props) => {
  return (
    <VerticalTimeline lineColor="#ddd">
      {options.map((status, index: number) => (
        <VerticalTimelineElement
          visible
          key={index}
          className="vertical-timeline-element"
          contentStyle={{
            borderBottom: '8px',
            borderStyle: 'solid',
            borderBottomColor: 'rgb(101, 113, 96)',
            boxShadow: 'none'
          }}
          contentArrowStyle={{
            borderRight: '7px solid rgb(101, 113, 96)'
          }}
          iconStyle={{
            background: '#657160',
            color: 'rgb(101, 113, 96)'
          }}
        >
          <h3 className="vertical-timeline-element-title">{status?.title}</h3>
          <p className="vertical-timeline-element-subtitle text-[13px]">{status?.description}</p>
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  )
}

export default VerticalTimelineComponent
