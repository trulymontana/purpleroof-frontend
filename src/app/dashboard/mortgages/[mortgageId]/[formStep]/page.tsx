'use client'

import CustomerInfoForm from '@/app/dashboard/mortgages/_forms/customer-info-form'
import TransactionInfoForm from '@/app/dashboard/mortgages/_forms/transaction-info-form'

interface Props {
  params: {
    mortgageId: string
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
    'customer-info': <CustomerInfoForm mortgageId={mortgageId} onSave={storeValues} />
  }

  return (
    <>
      <div className={'mx-2 mb-10 mt-6 flex flex-col gap-4 rounded bg-white p-3 lg:p-6'}>{subComponents[formStep]}</div>
    </>
  )
}

export default Page
