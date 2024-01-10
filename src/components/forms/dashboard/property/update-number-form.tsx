import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useUpdatePropertyMutation } from '@/data/hooks/usePropertiesClient'
import { Property } from '@/data/clients/propertiesClient'
import PhoneNumberInputElement from '@/components/forms/elements/phone-number-input'

interface Props {
    data: Property
}

const formSchema = z.object({
    phone: z
        .string({
            required_error: 'Please enter a valid phone number.'
        })
        .min(10, {
            message: 'Phone number must be at least 10 characters.'
        }),
})

type TAgent = z.infer<typeof formSchema>
const UpdateNumberForm = ({ data }: Props) => {
    const { mutate: updateProperty, isPending: isLoading } = useUpdatePropertyMutation()

    const form = useForm<TAgent>({
        resolver: zodResolver(formSchema)
    })

    function onSubmit(values: TAgent) {
        updateProperty({
            id: data.id,
            ...values
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 p-4">
                <PhoneNumberInputElement name="phone" label="Phone Number" />
                <Button disabled={isLoading} type="submit" className='w-full'>
                    {isLoading ? 'Updating...' : 'Update'}
                </Button>
            </form>
        </Form>
    )
}

export default UpdateNumberForm
