import { Mortgage } from "@/data/clients/mortgageClient"
import { User } from "lucide-react"

interface Props {
    data: Mortgage
}

const PersonalInformationCard = ({ data }: Props) => {
    return (
        <div className="grid gap-8 rounded-xl border p-5 shadow-md shadow-primary/30">
            <div className="w-full">
                <h3 className="my-2 flex items-center gap-2 text-3xl font-semibold text-primary">
                    <User className="font-semibold" /> Personal Information
                </h3>
                <div className="mt-5 grid w-full grid-cols-2 content-between gap-x-16 gap-y-4">
                    <div className="flex justify-between">
                        <p>First Name</p>
                        <p className="detail">{data?.firstName.toLocaleLowerCase() ?? "-"}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Last Name</p>
                        <p className="detail">{data?.lastName.toLocaleLowerCase() ?? "-"}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Email</p>
                        <p className="font-semibold">{data?.email ?? "-"}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Contact</p>
                        <p className="detail">{data?.phoneNumber ?? "-"}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Date of Birth</p>
                        <p className="detail">{new Date(data?.dateOfBirth).toLocaleDateString() ?? "-"}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Country</p>
                        <p className="detail">{data?.country ?? "-"}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonalInformationCard