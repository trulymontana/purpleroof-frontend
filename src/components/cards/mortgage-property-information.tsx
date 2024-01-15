import { Mortgage } from '@/data/clients/mortgageClient'
import { LandPlot } from 'lucide-react'

interface Props {
  data: Mortgage
}
const PropertyInformationCard = ({ data }: Props) => {
  return (
    <div className="custom_card">
      <div className="w-full">
        <h3 className="my-2 flex items-center gap-2 text-3xl font-semibold text-primary">
          <LandPlot className="font-semibold" /> Property Information
        </h3>
        <div className="custom_card_details">
          <div className="flex justify-between">
            <p>Property Type</p>
            <p className="detail">{data?.propertyType?.toLocaleLowerCase().replaceAll('_', ' ') ?? '-'}</p>
          </div>
          <div className="flex justify-between">
            <p>Completion Status</p>
            <p className="detail">{data?.completionStatus?.toLocaleLowerCase().replaceAll('_', ' ') ?? '-'}</p>
          </div>
          <div className="flex justify-between">
            <p>Emirate</p>
            <p className="detail">{data?.emirate?.toLocaleLowerCase().replaceAll('_', ' ') ?? '-'}</p>
          </div>
          <div className="flex justify-between">
            <p>Additional Details</p>
            <p className="detail">{data?.additionalDetail ?? '-'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyInformationCard
