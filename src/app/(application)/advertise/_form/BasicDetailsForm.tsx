'use client'
import React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import { Form } from '@/components/ui/form'

import * as z from 'zod'
import InputElement from '@/components/forms/elements/input-element'
import SelectElement from '@/components/forms/elements/select-element'
import { Categories, CommercialTypes, ResidentalTypes, TypesOfProperties } from '@/constants/advertise'
import RadioGroupElement from '@/components/forms/elements/radio-group-element'
import TabRadioGroup from '@/components/forms/elements/tab-radio-group'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
    category: z.string({
        required_error: "Please select a category"
    }),
    advert_title: z.string({
        required_error: 'Title should not be empty!',
    }),
    type_of_property: z.string({
        required_error: "Please select a property type!"
    }),
    property_option: z.string({
        required_error: "Please select a property option"
    })
})

interface Props {
    onSave: (step: string, values: any) => void
    onNext?: () => void
    onPrevious?: () => void
}

const BasicDetailsForm = ({ onSave, onNext, onPrevious }: Props) => {

    const router = useRouter();

    // const [propertyType, setPropertyType] = useState("Residential");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { "category": "sell", "type_of_property": "Residential" }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        onSave("basic-details", values)
        router.push(`/advertise/property-details?categoryType=${form.getValues("category")}`)
    }

    const propertyType = form.watch("type_of_property")

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-[28rem] space-y-4 p-4 shadow-md"
            >
                <TabRadioGroup
                    name="category"
                    options={Categories}
                />

                <InputElement name="advert_title" label={'Advert Title'} />

                <RadioGroupElement
                    name="type_of_property"
                    label={'Type of Property'}
                    className='items-center gap-10'
                    options={TypesOfProperties}
                />

                <SelectElement
                    name='property_option'
                    label={propertyType}
                    options={propertyType === "Residential" ? ResidentalTypes : CommercialTypes}
                />
                <Button type='submit' className='w-full'>
                    Save and Continue
                </Button>
            </form>
        </Form >
    )
}

export default BasicDetailsForm