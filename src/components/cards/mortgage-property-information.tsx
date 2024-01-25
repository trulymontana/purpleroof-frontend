import { Mortgage } from '@/data/clients/mortgageClient'
import { LandPlot } from 'lucide-react'
import CardField from './card-field'
import { formatString } from '@/lib/utils'

interface Props {
  data: Mortgage
}
const PropertyInformationCard = ({ data }: Props) => {
  return (
    <div className="custom_card">
      <div className="w-full">
        <h3 className="custom_card_heading">
          <LandPlot className="font-semibold" /> Property Information
        </h3>
        <div className="custom_card_details">
          <CardField label='Property Type' value={formatString(data?.propertyType)} />
          <CardField label='Completion Status' value={formatString(data?.completionStatus)} />
          <CardField label='Emirate' value={formatString(data?.emirate)} />
          <CardField label='Additional Details' value={formatString(data?.additionalDetail)} />
        </div>
      </div>
    </div>
  )
}

export default PropertyInformationCard
