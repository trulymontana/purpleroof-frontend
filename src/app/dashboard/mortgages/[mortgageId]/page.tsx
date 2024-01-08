'use client'

import { useGetOneMortgage } from '@/data/hooks/useMortgageClient'
import Loader from '@/components/Loader'
import { Button } from '@/components/ui/button'
import ConfirmActionDialog from '@/components/dialogs/confirm-action-dialog'
import UpdateMortgageStatusForm from '../_forms/update-status-form'
import { useGetUserDetails, useGetUserRole } from '@/data/hooks/useAuthClient'
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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import VerticalTimelineComponent from '@/components/timeline/vertical-timeline'

interface Props {
  params: {
    mortgageId: number
  }
}
const Page = ({ params: { mortgageId } }: Props) => {

  const role = useGetUserRole();
  const isAdmin = role === UserRoleEnum.ADMIN || role === UserRoleEnum.SUPER_ADMIN

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
        <div className="flex flex-col items-center justify-between gap-4 py-3 md:flex-row">
          <h2 className="text-4xl font-bold text-primary underline underline-offset-4">Mortgage Details</h2>
          <div className='space-x-2'>
            {!loading &&
              (userDetails.role === UserRoleEnum.ADMIN || userDetails.role === UserRoleEnum.SUPER_ADMIN) &&
              data && (
                <ConfirmActionDialog
                  title="Edit Mortgage"
                  anchor={<Button>Update Status</Button>}
                  content={<UpdateMortgageStatusForm data={data} />}
                />
              )}
            <Sheet>
              <SheetTrigger asChild>
                <Button>View Timeline</Button>
              </SheetTrigger>
              <SheetContent className='sm:w-full xl:w-1/2 md:max-w-full overflow-y-scroll'>
                <SheetHeader>
                  <SheetTitle>Mortgage Timeline</SheetTitle>
                </SheetHeader>
                <div className="">
                  {data?.history && data?.history.length > 0 && <VerticalTimelineComponent options={data?.history} />}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <div className="mx-auto flex w-full flex-col items-start gap-8 py-6 md:flex-row">
          <div className="min-w-2/3 flex flex-1 flex-col gap-8">
            {data && <PersonalInformationCard data={data} />}
            {data && <IncomeInformationCard data={data} />}
            {data && data.status !== MortgageStatusEnum.SUBMITTED && <PropertyInformationCard data={data} />}
            {data && data.status !== MortgageStatusEnum.SUBMITTED && <OtherInformationCard data={data} />}
            {!isAdmin && data?.status === MortgageStatusEnum.SUBMITTED && (
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
          <div className="w-full space-y-4 md:w-1/3">
            {data && <RequiredDocumentsCards data={data} />}
            {data &&
              data.status !== MortgageStatusEnum.SUBMITTED &&
              data.references.map(({ title, name, phone, relationship }, i) => (
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
