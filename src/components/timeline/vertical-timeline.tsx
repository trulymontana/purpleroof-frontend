import { historyType } from '@/constants/types'
import {
    VerticalTimeline,
    VerticalTimelineElement,
} from 'react-vertical-timeline-component'
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
                        borderBottom: "8px",
                        borderStyle: "solid",
                        borderBottomColor: "rgb(97, 62, 131)",
                        boxShadow: "none",
                    }}
                    contentArrowStyle={{
                        borderRight: '7px solid rgb(97, 62, 131)',
                    }}
                    iconStyle={{
                        background: "#613e83", color: 'rgb(97, 62, 131)'
                    }}
                >
                    <h3 className="vertical-timeline-element-title">
                        {status?.title}
                    </h3>
                    <p className="vertical-timeline-element-subtitle text-[13px]">
                        {status?.description}
                    </p>
                </VerticalTimelineElement>
            ))}
        </VerticalTimeline>
    )
}

export default VerticalTimelineComponent