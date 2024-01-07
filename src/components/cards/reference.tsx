import { RelationshipEnum } from '@/constants/enums'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

interface Props {
    title: string;
    name: string;
    phone: string;
    relationship: RelationshipEnum
}

const ReferenceCard = ({ title, name, phone, relationship }: Props) => {
    return (
        <Card className="w-full mx-auto bg-white rounded-xl shadow-md shadow-primary/30 overflow-hidden">
            <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary dark:text-white">{title.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase()) ?? "-"}</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 p-8">
                <div className="space-y-2">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Name</h3>
                    <p className="text-gray-500 dark:text-gray-400">{name ?? "-"}</p>
                </div>
                <div className="space-y-2">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Contact</h3>
                    <p className="text-gray-500 dark:text-gray-400">{phone ?? "-"}</p>
                </div>
                <div className="space-y-2">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Relationship</h3>
                    <p className="text-gray-500 dark:text-gray-400 capitalize">{relationship.toLocaleLowerCase() ?? "-"}</p>
                </div>
            </CardContent>
        </Card>
    )
}

export default ReferenceCard