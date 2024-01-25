import { Mortgage } from '@/data/clients/mortgageClient'
import { User } from 'lucide-react'
import CardField from './card-field'
import { formatString } from '@/lib/utils'

interface Props {
  data: Mortgage
}

const PersonalInformationCard = ({ data }: Props) => {
  return (
    <div className="custom_card">
      <div className="w-full">
        <h3 className="custom_card_heading">
          <User className="font-semibold" /> Personal Information
        </h3>
        <div className="custom_card_details">
          <CardField label='First Name' value={formatString(data?.firstName)} />
          <CardField label='Last Name' value={formatString(data?.lastName)} />
          <CardField label='Email' value={formatString(data?.email)} className='lowercase' />
          <CardField label='Contact' value={formatString(data?.phoneNumber)} />
          <CardField label='Date of Birth' value={new Date(data?.dateOfBirth).toLocaleDateString() ?? '-'} />
          <CardField label='Country' value={formatString(data?.country)} />
        </div>
      </div>
    </div>
  )
}

export default PersonalInformationCard
