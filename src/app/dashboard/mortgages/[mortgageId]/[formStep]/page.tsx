"use client"

import CustomerInfoForm from '@/app/dashboard/mortgages/_forms/customer-info-form'
import TransactionInfoForm from '@/app/dashboard/mortgages/_forms/transaction-info-form'

interface Props {
    params: {
        mortgageId: string,
        formStep: string
    }
}



const Page = ({ params: { mortgageId, formStep } }: Props) => {

    const subComponents: { [key: string]: React.ReactElement } = {
        'transaction-info': <TransactionInfoForm mortgageId={mortgageId} />,
        // documents form
        'customer-info': <CustomerInfoForm mortgageId={mortgageId} />,
    }

    return (
        <>
            <div className={`lg:p-6 p-3 border rounded mx-2 bg-white mb-10 flex flex-col gap-4 mt-6`}>
                <h1 className='text-4xl font-bold text-black/80'>Transaction Info</h1>
                {subComponents[formStep]}
            </div>
            <div className="mt-10 flex justify-end mx-2">
            </div>
        </>
    )
}

export default Page