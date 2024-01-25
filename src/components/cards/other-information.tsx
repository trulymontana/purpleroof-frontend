import { Mortgage } from '@/data/clients/mortgageClient'
import { GanttChartSquare } from 'lucide-react'

interface Props {
  data: Mortgage
}
const OtherInformationCard = ({ data }: Props) => {
  return (
    <div className="custom_card">
      <div className="w-full">
        <h3 className="custom_card_heading">
          <GanttChartSquare className="font-semibold" /> Other Information
        </h3>
        <div className="custom_card_details">
          <div className="flex justify-between">
            <p>Education Type</p>
            <p className="detail">{data?.educationType?.toLocaleLowerCase().replaceAll('_', ' ') ?? '-'}</p>
          </div>
          <div className="flex justify-between">
            <p>Marital Status</p>
            <p className="detail">{data?.maritalStatus?.toLocaleLowerCase() ?? '-'}</p>
          </div>
          <div className="flex justify-between">
            <p>Favorite City</p>
            <p className="font-semibold">{data?.favoriteCity ?? '-'}</p>
          </div>
          <div className="flex justify-between">
            <p>Family Members in UAE</p>
            <p className="detail">{data?.familyMembersInUae ?? '-'}</p>
          </div>
          <div className="flex justify-between">
            <p>Years in UAE</p>
            <p className="detail">{data?.yearsInUae ?? '-'}</p>
          </div>
          <div className="flex justify-between">
            <p>Annual Rental Income</p>
            <p className="detail">{data?.annualRentalIncome ?? '-'}</p>
          </div>
          <div className="flex justify-between">
            <p>UAE Residence Address</p>
            <p className="detail">{data?.uaeResidenceAddress ?? '-'}</p>
          </div>
          <div className="flex justify-between">
            <p>Home Country Address</p>
            <p className="detail">{data?.homeCountryAddress ?? '-'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OtherInformationCard
