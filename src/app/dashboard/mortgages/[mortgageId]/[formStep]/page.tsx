'use client'

import CustomerInfoForm from '@/app/dashboard/mortgages/_forms/customer-info-form'
import TransactionInfoForm from '@/app/dashboard/mortgages/_forms/transaction-info-form'
import { PageRoutes } from '@/constants/page-routes'
import UploadDocumentsForm from '../../_forms/upload-documents-form'
import { useCreateMortgageTransactionMutation, useGetOneMortgage } from '@/data/hooks/useMortgageClient'
import { LocalStorageKeys } from '@/constants/local-storage-keys'
import { nullCheckAndMerge } from '@/lib/utils'

interface Props {
  params: {
    mortgageId: number
    formStep: string
  }
}

const Page = ({ params: { mortgageId, formStep } }: Props) => {

  const { data } = useGetOneMortgage(mortgageId)

  const { mutate: createMortgageTransaction } = useCreateMortgageTransactionMutation()

  const storeValues = (step: string, values: any) => {
    localStorage.setItem(step, JSON.stringify(values))
  }

  const handleSubmit = (values: any) => {
    console.log({ values })
    const transactionInfo = localStorage.getItem(LocalStorageKeys.MORTGAGE_TRANSACTION_INFO)
    const customerInfo = localStorage.getItem(LocalStorageKeys.MORTGAGE_CUSTOMER_INFO)

    console.log({ transactionInfo, customerInfo })

    let result: any = {}

    nullCheckAndMerge(result, transactionInfo)
    nullCheckAndMerge(result, customerInfo)

    let mortgageTransaction = Object.assign({}, result, values)

    createMortgageTransaction({
      ...mortgageTransaction
    })
  }

  const subComponents: { [key: string]: React.ReactElement } = {
    [PageRoutes.mortgage_transaction.TRANSACTION_INFO]: <TransactionInfoForm mortgageId={mortgageId} onSave={storeValues} />,
    [PageRoutes.mortgage_transaction.CUSTOMER_INFO]: <CustomerInfoForm data={data} mortgageId={mortgageId} onSave={storeValues} />,
    // @ts-ignore
    [PageRoutes.mortgage_transaction.DOCUMENTS]: <UploadDocumentsForm mortgageId={mortgageId} requiredDocuments={data?.requirement?.requiredDocuments} handleSubmit={handleSubmit} />,
  }

  return (
    <div className={"lg:p-6 p-3 rounded mx-2 bg-white mb-10 flex flex-col gap-4 mt-6"}>
      {subComponents[formStep]}
    </div>
  )

}

export default Page
