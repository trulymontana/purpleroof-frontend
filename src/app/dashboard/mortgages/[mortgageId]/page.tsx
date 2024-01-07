'use client'

import { useGetOneMortgage } from '@/data/hooks/useMortgageClient'
import Loader from '@/components/Loader'
import { Button } from '@/components/ui/button'
import ConfirmActionDialog from '@/components/dialogs/confirm-action-dialog'
import UpdateMortgageStatusForm from '../_forms/update-status-form'
import { useGetUserDetails } from '@/data/hooks/useAuthClient'
import PersonalInformationCard from '@/components/cards/personal-information'
import IncomeInformationCard from '@/components/cards/income-information'
import PropertyInformationCard from '@/components/cards/mortgage-property-information'
import { MortgageStatusEnum, UserRoleEnum } from '@/constants/enums'
import OtherInformationCard from '@/components/cards/other-information'
import Link from 'next/link'
import { PageRoutes } from '@/constants/page-routes'
import { LocalStorageKeys } from '@/constants/local-storage-keys'
import RequiredDocumentsCards from '@/components/cards/required-documents'
import ReferenceCard from '@/components/cards/reference'
import ChatBox from '@/components/cards/chat-box'

interface Props {
  params: {
    mortgageId: number
  }
}
const Page = ({ params: { mortgageId } }: Props) => {

  const { loading, data, fetching } = useGetOneMortgage(mortgageId)
  const { data: userDetails } = useGetUserDetails()


  if (fetching) {
    return (
      <div className="flex h-[100vh] items-center justify-center">
        <Loader />
      </div>
    )
  }

  return (
    <>
      <main className="container px-3 py-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between py-3">
          <h2 className="text-4xl font-bold underline underline-offset-4 text-primary">Mortgage Details</h2>
          {!loading && (userDetails.role === UserRoleEnum.ADMIN || userDetails.role === UserRoleEnum.SUPER_ADMIN) && data && (
            <ConfirmActionDialog
              title="Edit Mortgage"
              anchor={<Button>Update Status</Button>}
              content={<UpdateMortgageStatusForm data={data} />}
            />
          )}
        </div>
        <div className="mx-auto flex w-full flex-col items-start gap-8 py-6">
          <div className='flex flex-1 min-w-2/3 flex-col gap-8'>
            {data && <PersonalInformationCard data={data} />}
            {data && <IncomeInformationCard data={data} />}
            {data && data.status !== MortgageStatusEnum.SUBMITTED && <PropertyInformationCard data={data} />}
            {data && data.status !== MortgageStatusEnum.SUBMITTED && <OtherInformationCard data={data} />}
            {data?.status === MortgageStatusEnum.SUBMITTED && (
              <Link
                className="w-full"
                href={PageRoutes.dashboard.COMPLETE_MORTGAGE_APPLICATION(
                  mortgageId,
                  LocalStorageKeys.MORTGAGE_TRANSACTION_INFO
                )}
              >
                <Button className="w-full">Complete Your Application</Button>
              </Link>
            )}
          </div>
          <div className="w-full md:w-1/3 space-y-4">
            {data && <RequiredDocumentsCards data={data} />}
            {data && data.status !== MortgageStatusEnum.SUBMITTED && data.references.map(({ title, name, phone, relationship }, i) => (
              <ReferenceCard key={i} title={title} name={name} phone={phone} relationship={relationship} />
            ))}
          </div>
        </div>
      </main>
      <div className="fixed bottom-4 right-4">
        <ChatBox userDetails={userDetails} mortgageId={mortgageId} />
      </div>
    </>
  )
}

export default Page
