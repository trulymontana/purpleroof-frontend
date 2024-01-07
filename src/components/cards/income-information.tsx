import { Mortgage } from '@/data/clients/mortgageClient'
import currency from '@/lib/currency'
import { CreditCard, DollarSign, LandPlot } from 'lucide-react'

interface Props {
  data: Mortgage
}

const IncomeInformationCard = ({ data }: Props) => {
  return (
    <div className="custom_card">
      <div className="w-full">
        <h3 className="my-2 flex items-center gap-2 text-3xl font-semibold text-primary">
          <CreditCard className="font-semibold" /> Financial Information
        </h3>
        <div className="custom_card_details">
          <div className="flex justify-between">
            <p>Gross Montly Income</p>
            <p className="detail">{currency.format(data?.monthlyIncome) ?? '-'}</p>
          </div>
          <div className="flex justify-between">
            <p>Value of Property</p>
            <p className="detail">{currency.format(data?.valueOfProperty) ?? '-'}</p>
          </div>
          <div className="flex justify-between">
            <p>Income Profile</p>
            <p className="detail">{data?.incomeProfile?.toLocaleLowerCase().replaceAll('_', ' ') ?? '-'}</p>
          </div>
          <div className="flex justify-between">
            <p>Residential Status</p>
            <p className="detail">{data?.residenceType?.toLocaleLowerCase().replaceAll('_', ' ') ?? '-'}</p>
          </div>
          <div className="flex w-full items-center justify-between">
            <p>Loan Type</p>
            <p className="detail">{data?.loanType?.toLocaleLowerCase().replaceAll('_', ' ') ?? '-'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IncomeInformationCard
