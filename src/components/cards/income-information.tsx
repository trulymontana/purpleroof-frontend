import { Mortgage } from "@/data/clients/mortgageClient"
import currency from "@/lib/currency"
import { CreditCard, DollarSign, LandPlot } from "lucide-react"

interface Props {
  data: Mortgage
}

const IncomeInformationCard = ({ data }: Props) => {
  return (
    <div className="grid gap-8 rounded-xl border p-5 shadow-md shadow-primary/30">
      <div className="w-full">
        <h3 className="my-2 flex items-center gap-2 text-3xl font-semibold text-primary">
          <CreditCard className="font-semibold" /> Financial Information
        </h3>
        <div className="mt-5 grid w-full grid-cols-2 content-between gap-x-16 gap-y-4">
          <div className="flex justify-between">
            <p>Gross Montly Income</p>
            <p className="detail">{currency.format(data?.monthlyIncome) ?? "-"}</p>
          </div>
          <div className="flex justify-between">
            <p>Value of Property</p>
            <p className="detail">{currency.format(data?.valueOfProperty) ?? "-"}</p>
          </div>
          <div className="flex justify-between">
            <p>Income Profile</p>
            <p className="detail">{data?.incomeProfile?.toLocaleLowerCase().replaceAll("_", " ") ?? "-"}</p>
          </div>
          <div className="flex justify-between">
            <p>Residential Status</p>
            <p className="detail">{data?.residenceType?.toLocaleLowerCase().replaceAll("_", " ") ?? "-"}</p>
          </div>
          <div className="flex items-center justify-between w-full">
            <p>Loan Type</p>
            <p className="detail">{data?.loanType?.toLocaleLowerCase().replaceAll("_", " ") ?? "-"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IncomeInformationCard