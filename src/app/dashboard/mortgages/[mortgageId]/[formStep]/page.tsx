'use client'

import CustomerInfoForm from '@/app/dashboard/mortgages/_forms/customer-info-form'
import TransactionInfoForm from '@/app/dashboard/mortgages/_forms/transaction-info-form'
import { PageRoutes } from '@/constants/page-routes'

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
    [PageRoutes.mortgage_transaction.TRANSACTION_INFO]: <TransactionInfoForm mortgageId={mortgageId} onSave={storeValues} />,
    // documents form
    [PageRoutes.mortgage_transaction.CUSTOMER_INFO]: <CustomerInfoForm mortgageId={mortgageId} onSave={storeValues} />,
  }

  return (
    <div className={"lg:p-6 p-3 rounded mx-2 bg-white mb-10 flex flex-col gap-4 mt-6"}>
      {subComponents[formStep]}
    </div>
  )

}

export default Page
