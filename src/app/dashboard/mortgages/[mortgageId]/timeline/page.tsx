"use client"

import { mortgageSubmissionStatuses } from '@/constants/mortgage';
import { useGetOneMortgage } from '@/data/hooks/useMortgageClient';
import {
    VerticalTimeline,
    VerticalTimelineElement,
} from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'

interface Props {
    params: {
        mortgageId: number
    }
}

const Page = ({ params: { mortgageId } }: Props) => {

    const { data } = useGetOneMortgage(mortgageId);

    return (
        <div className='p-4'>
            <p className="text-3xl text-center mb-2">Mortgage Timeline</p>
            <VerticalTimeline lineColor="#ddd">
                {mortgageSubmissionStatuses.map((status, index) => (
                    <VerticalTimelineElement
                        visible
                        key={index}
                        className="vertical-timeline-element"
                        contentStyle={{
                            border: '1px solid rgb(221 221 221)',
                            background: '#fff',
                            color: '#000',
                        }}
                        contentArrowStyle={{
                            borderRight: '7px solid  rgb(221 221 221)',
                        }}
                        iconStyle={{
                            background:
                                index <= mortgageSubmissionStatuses.findIndex(
                                    (stat) => stat.value === data?.status
                                )
                                    ? "#613e83"
                                    : "#fff", color: '#000'
                        }}
                    >
                        <h3 className="vertical-timeline-element-title">
                            {status.label}
                        </h3>
                    </VerticalTimelineElement>
                ))}
            </VerticalTimeline>
        </div>
    );
};

export default Page;