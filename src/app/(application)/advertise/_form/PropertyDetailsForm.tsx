'use client'
import React, { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import { Form } from '@/components/ui/form'

import * as z from 'zod'
import InputElement from '@/components/forms/elements/input-element'
import SelectElement from '@/components/forms/elements/select-element'
import { BathRooms, BedRooms } from '@/constants/advertise'
import { useRouter } from 'next/navigation'
import 'react-international-phone/style.css';
import PhoneNumberInputElement from '@/components/forms/elements/phone-number-input'

const formSchema = z.object({
    phone: z
        .string({
            required_error: 'Please enter a valid phone number.',
        })
        .min(10, {
            message: 'Phone number must be at least 10 characters.',
        }),
    property_value: z.string({
        required_error: "Please enter a property value"
    }),
    property_size: z.string({
        required_error: "Please enter a property size"
    }),
    bed_rooms: z.string({
        required_error: "Please enter number of bed rooms!"
    }),
    bath_rooms: z.string({
        required_error: "Please enter number of bath rooms!"
    }),
    deed_number: z.string({
        required_error: "Please enter your Deed Number"
    }),
})


interface Props {
    onSave: (step: string, values: any) => void
}

const PropertyDetailsForm = ({ onSave }: Props) => {

    const router = useRouter();

    const storedValue = localStorage.getItem("advertise/property-details");

    const defaultValues: z.infer<typeof formSchema> = storedValue !== null && JSON.parse(storedValue);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        onSave("property-details", values)
        router.push(`/advertise/location-details`)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-4 p-4"
            >
                <PhoneNumberInputElement name='phone' label='Phone Number' />

                <InputElement name="property_value" type='number' placeholder='Please enter your property value' label={'Property Value (AED)'} />
                <InputElement name="property_size" placeholder='Please enter your property size' type='number' label={'Property Size (Sqft)'} />

                <SelectElement
                    name="bed_rooms"
                    placeholder='Please select number of bed rooms'
                    label={'Number of Bed Rooms'}
                    options={BedRooms}
                />

                <SelectElement
                    name="bath_rooms"
                    placeholder='Please select number of bath rooms'
                    label={'Number of Bath Rooms'}
                    options={BathRooms}
                />

                <InputElement name="deed_number" placeholder='Please enter deed number' label={'Title Deed / Oqod / Initial Contract of Sales'} />

                <Button type="submit" className="w-full">
                    Save and Continue
                </Button>
                <Button type='button' variant="outline" onClick={() => router.push(`/advertise/basic-details`)} className="w-full">
                    Go Back
                </Button>
            </form>
        </Form>
    )
}

export default PropertyDetailsForm
