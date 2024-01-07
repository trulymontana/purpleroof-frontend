import { Mortgage } from "@/data/clients/mortgageClient"
import { LandPlot } from "lucide-react"

interface Props {
  data: Mortgage
}
const PropertyInformationCard = ({ data }: Props) => {
  return (
    <div className="grid gap-8 rounded-xl border p-5 shadow-md shadow-primary/30">
      <div className="w-full">
        <h3 className="my-2 flex items-center gap-2 text-3xl font-semibold text-primary">
          <LandPlot className="font-semibold" /> Property Information
        </h3>
        <div className="mt-5 grid w-full grid-cols-2 content-between gap-x-16 gap-y-4">
          <div className="flex justify-between">
            <p>Property Type</p>
            <p className="detail">{data?.propertyType.toLocaleLowerCase().replaceAll("_", " ") ?? "-"}</p>
          </div>
          <div className="flex justify-between">
            <p>Completion Status</p>
            <p className="detail">{data?.completionStatus?.toLocaleLowerCase().replaceAll("_", " ") ?? "-"}</p>
          </div>
          <div className="flex justify-between">
            <p>Emirate</p>
            <p className="detail">{data?.emirate.toLocaleLowerCase().replaceAll("_", " ") ?? "-"}</p>
          </div>
          <div className="flex justify-between">
            <p>Additional Details</p>
            <p className="detail">{data?.additionalDetails ?? "-"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyInformationCard