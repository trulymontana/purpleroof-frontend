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

    const storeValues = (step: string, values: any) => {
        localStorage.setItem(step, JSON.stringify(values))
    }

    const subComponents: { [key: string]: React.ReactElement } = {
        'transaction-info': <TransactionInfoForm mortgageId={mortgageId} onSave={storeValues} />,
        // documents form
        'customer-info': <CustomerInfoForm mortgageId={mortgageId} onSave={storeValues} />,
    }

    return (
        <>
            <div className={"lg:p-6 p-3 rounded mx-2 bg-white mb-10 flex flex-col gap-4 mt-6"}>
                {subComponents[formStep]}
            </div>
            <div className="mt-10 flex justify-end mx-2">
            </div>
        </>
    )
}

export default Page