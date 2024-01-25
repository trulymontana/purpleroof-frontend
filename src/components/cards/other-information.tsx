import { Mortgage } from '@/data/clients/mortgageClient'
import { GanttChartSquare } from 'lucide-react'
import CardField from './card-field'
import { formatString } from '@/lib/utils'

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
          <CardField label='Education Type' value={formatString(data?.educationType)} />
          <CardField label='Marital Status' value={formatString(data?.maritalStatus)} />
          <CardField label='Favorite City' value={formatString(data?.favoriteCity)} />
          <CardField label='Family Members in UAE' value={data?.familyMembersInUae ?? '-'} />
          <CardField label='Years in UAE' value={data?.yearsInUae ?? '-'} />
          <CardField label='Annual Rental Income' value={data?.annualRentalIncome ?? '-'} />
          <CardField label='UAE Residence Address' value={formatString(data?.uaeResidenceAddress)} />
          <CardField label='Home Country Address' value={formatString(data?.homeCountryAddress)} />
        </div>
      </div>
    </div>
  )
}

export default OtherInformationCard
