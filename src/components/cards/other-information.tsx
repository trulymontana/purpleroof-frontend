import { Mortgage } from '@/data/clients/mortgageClient'
import { GanttChartSquare } from 'lucide-react'
import React from 'react'

interface Props {
  data: Mortgage
}
const OtherInformationCard = ({ data }: Props) => {
  return (
    <div className="grid gap-8 rounded-xl border p-5 shadow-md shadow-primary/30">
      <div className="w-full">
        <h3 className="my-2 flex items-center gap-2 text-3xl font-semibold text-primary">
          <GanttChartSquare className="font-semibold" /> Other Information
        </h3>
        <div className="mt-5 grid w-full grid-cols-2 content-between gap-x-16 gap-y-4">
          <div className="flex justify-between">
            <p>Education Type</p>
            <p className="detail">{data?.educationType ?? "-"}</p>
          </div>
          <div className="flex justify-between">
            <p>Marital Status</p>
            <p className="detail">{data?.maritalStatus ?? "-"}</p>
          </div>
          <div className="flex justify-between">
            <p>Favorite City</p>
            <p className="font-semibold">{data?.favoriteCity ?? "-"}</p>
          </div>
          <div className="flex justify-between">
            <p>Family Members in UAE</p>
            <p className="detail">{data?.familyMembersInUae ?? "-"}</p>
          </div>
          <div className="flex justify-between">
            <p>Years in UAE</p>
            <p className="detail">{data?.yearsInUae ?? "-"}</p>
          </div>
          <div className="flex justify-between">
            <p>Annual Rental Income</p>
            <p className="detail">{data?.annualRentalIncome ?? "-"}</p>
          </div>
          <div className="flex justify-between">
            <p>UAE Residence Address</p>
            <p className="detail">{data?.uaeResidenceAddress ?? "-"}</p>
          </div>
          <div className="flex justify-between">
            <p>Home Country Address</p>
            <p className="detail">{data?.homeCountryAddress ?? "-"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OtherInformationCard