"use client"

import VerticalTimelineComponent from '@/components/timeline/vertical-timeline';
import { useGetOneMortgage } from '@/data/hooks/useMortgageClient';
import 'react-vertical-timeline-component/style.min.css'

interface Props {
    params: {
        mortgageId: number
    }
}

const Page = ({ params: { mortgageId } }: Props) => {

    const { data } = useGetOneMortgage(mortgageId);

    return (
        <div className='p-4 bg-gray-300/40 dark:bg-gray-800/40'>
            <p className="text-3xl text-center mb-2">Mortgage Timeline</p>
            {data?.history && data?.history.length > 0 && (
                <VerticalTimelineComponent options={data?.history} />
            )}
        </div>
    );
};

export default Page;