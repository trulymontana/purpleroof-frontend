'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import { Form } from '@/components/ui/form'

import * as z from 'zod'
import { CallPreferences } from '@/constants/advertise'
import RadioGroupElement from '@/components/forms/elements/radio-group-element'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
    call_preference: z.string({
        required_error: "Please select a call preference!"
    })
})

interface Props {
    onSave: (step: string, values: any) => void
}

const CallPreferenceForm = ({ onSave }: Props) => {

    const router = useRouter();

    const storedValue = localStorage.getItem("advertise/location-details");

    const defaultValues: z.infer<typeof formSchema> = storedValue !== null && JSON.parse(storedValue)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues
    })

    const handlePreferenceChange = (value: string) => {
        form.setValue("call_preference", value)
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        onSave("call-preference", values)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-[28rem] space-y-4 p-4 shadow-md"
            >
                <RadioGroupElement
                    handleChange={handlePreferenceChange}
                    name="call_preference"
                    label={'How would you prefer to handle inquiries from potential leads interested in this advertisement?'}
                    className='items-start gap-4 flex-col'
                    options={CallPreferences}
                />

                <Button type="submit" className="w-full">
                    Save and Continue
                </Button>
                <Button type='button' onClick={() => router.push(`/advertise/project-status`)} className="w-full">
                    Go Back
                </Button>
            </form>
        </Form>
    )
}

export default CallPreferenceForm