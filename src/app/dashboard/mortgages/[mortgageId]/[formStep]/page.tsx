'use client'

import CustomerInfoForm from '@/app/dashboard/mortgages/_forms/customer-info-form'
import TransactionInfoForm from '@/app/dashboard/mortgages/_forms/transaction-info-form'
import { PageRoutes } from '@/constants/page-routes'
import UploadDocumentsForm from '../../_forms/upload-documents-form'
import { useGetOneMortgage, useUpdateMortgageMutation } from '@/data/hooks/useMortgageClient'
import { LocalStorageKeys } from '@/constants/local-storage-keys'
import { nullCheckAndMerge } from '@/lib/utils'
import { MortgageStatusEnum } from '@/constants/enums'

interface Props {
  params: {
    mortgageId: number
    formStep: string
  }
}

const Page = ({ params: { mortgageId, formStep } }: Props) => {

  const { loading, data } = useGetOneMortgage(mortgageId)
  const { mutate: updateMortgage } = useUpdateMortgageMutation()

  const storeValues = (step: string, values: any) => {
    localStorage.setItem(step, JSON.stringify(values))
  }


  const handleSubmit = (values: any) => {
    const transactionInfo = localStorage.getItem(`${LocalStorageKeys.MORTGAGE_TRANSACTION_INFO}-${mortgageId}`)
    const customerInfo = localStorage.getItem(`${LocalStorageKeys.MORTGAGE_CUSTOMER_INFO}-${mortgageId}`)

    let result: any = {}

    nullCheckAndMerge(result, transactionInfo)
    nullCheckAndMerge(result, customerInfo)

    let mortgageTransaction = Object.assign({}, result, values)

    mortgageTransaction.status = MortgageStatusEnum.UNDER_DOCUMENTATION_STAGE

    updateMortgage({
      id: data?.id,
      ...mortgageTransaction
    })
  }

  const subComponents: { [key: string]: React.ReactElement } = {
    [PageRoutes.mortgage_transaction.TRANSACTION_INFO]: <TransactionInfoForm mortgageId={mortgageId} onSave={storeValues} />,
    [PageRoutes.mortgage_transaction.CUSTOMER_INFO]: <CustomerInfoForm data={data} mortgageId={mortgageId} onSave={storeValues} />,
    // @ts-ignore
    [PageRoutes.mortgage_transaction.DOCUMENTS]: <UploadDocumentsForm isLoading={loading} mortgageId={mortgageId} requiredDocuments={data?.requirement?.requiredDocuments} handleSubmit={handleSubmit} />,

  }

  return (
    <div className={'mx-2 mb-10 mt-6 flex flex-col gap-4 rounded bg-white p-3 lg:p-6'}>{subComponents[formStep]}</div>
  )
}

export default Page
