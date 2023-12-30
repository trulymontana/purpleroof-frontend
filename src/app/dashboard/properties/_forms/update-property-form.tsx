import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import SelectElement from '@/components/forms/elements/select-element'
import { Button } from '@/components/ui/button'
import { PropertySubmissionStatusEnum } from '@/constants/enums'
import { propertySubmissionStatuses } from '@/constants/advertise'
import { useUpdatePropertyMutation } from '@/data/hooks/usePropertiesClient'
import { Property } from '@/data/clients/propertiesClient'

interface Props {
    data: Property
}

const formSchema = z.object({
    submissionStatus: z.nativeEnum(PropertySubmissionStatusEnum, {
        required_error: "Please select a status!"
    })
})

type TPropertyStatus = z.infer<typeof formSchema>
const UpdatePropertyForm = ({ data }: Props) => {
    const { mutate: updateProperty } = useUpdatePropertyMutation()

    const form = useForm<TPropertyStatus>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            submissionStatus: data?.submissionStatus
        }
    })

    function onSubmit(values: TPropertyStatus) {
        updateProperty({
            id: data?.id,
            ...values
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 p-4">
                <SelectElement
                    name="submissionStatus"
                    placeholder="Please select a status"
                    label="Status"
                    options={propertySubmissionStatuses}
                />
                <Button type="submit">Save changes</Button>
            </form>
        </Form>
    )
}

export default UpdatePropertyForm
