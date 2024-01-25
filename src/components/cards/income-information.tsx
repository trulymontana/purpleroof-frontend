import { Mortgage } from '@/data/clients/mortgageClient'
import currency from '@/lib/currency'
import { CreditCard, DollarSign, LandPlot } from 'lucide-react'
import CardField from './card-field'
import { formatString } from '@/lib/utils'

interface Props {
  data: Mortgage
}

const IncomeInformationCard = ({ data }: Props) => {
  return (
    <div className="custom_card">
      <div className="w-full">
        <h3 className="custom_card_heading">
          <CreditCard className="font-semibold" /> Financial Information
        </h3>
        <div className="custom_card_details">
          <CardField label='Gross Montly Income' value={currency.format(data?.monthlyIncome) ?? '-'} />
          <CardField label='Value of Property' value={currency.format(data?.valueOfProperty) ?? '-'} />
          <CardField label='Income Profile' value={formatString(data?.incomeProfile)} />
          <CardField label='Residential Status' value={formatString(data?.residenceType)} />
          <CardField label='Loan Type' value={formatString(data?.loanType)} />
        </div>
      </div>
    </div>
  )
}

export default IncomeInformationCard
