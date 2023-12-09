'use client'
import React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import { Form } from '@/components/ui/form'

import * as z from 'zod'
import InputElement from '@/components/forms/elements/input-element'
import SelectElement from '@/components/forms/elements/select-element'
import { BathRooms, BedRooms, PaymentIntervals } from '@/constants/advertise'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
    phone: z
        .string({
            required_error: 'Please enter a valid phone number.',
        })
        .min(10, {
            message: 'Phone number must be at least 10 characters.',
        }),
    rental_amount: z.string({
        required_error: "Please enter a rental amount"
    }),
    payment_interval: z.string({
        required_error: "Please select a payment interval"
    }),
    property_size: z.string({
        required_error: "Please enter a property size!"
    }),
    minimum_contract: z.string({
        required_error: "Please enter a minimum contract period!"
    }),
    bed_rooms: z.string({
        required_error: "Please enter number of bed rooms!"
    }),
    bath_rooms: z.string({
        required_error: "Please enter number of bath rooms!"
    }),
    deed_number: z.string({
        required_error: "Please enter your Deed Number"
    })
})

interface Props {
    onSave: (step: string, values: any) => void
}

const RentPropertyDetailsForm = ({ onSave }: Props) => {

    const router = useRouter();

    const storedValue = localStorage.getItem("advertise/property-details");

    const defaultValues: z.infer<typeof formSchema> = storedValue !== null && JSON.parse(storedValue)

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
                <InputElement name="phone" type='number' placeholder='Please enter your phone number' label={'Phone Number'} />
                <InputElement name="rental_amount" type='number' placeholder='Please enter rental amount' label={'Rental Amount (AED)'} />
                <SelectElement name='payment_interval' label='Payment Interval' options={PaymentIntervals} />
                <InputElement name="property_size" placeholder='Please enter property size' type='number' label={'Property Size (Sqft)'} />
                <InputElement name="minimum_contract" placeholder='Please enter minimum contract period' type='number' label={'Minimum Contract (in months)'} />

                <SelectElement
                    name="bed_rooms"
                    label={'Number of Bed Rooms'}
                    options={BedRooms}
                />

                <SelectElement
                    name="bath_rooms"
                    label={'Number of Bath Rooms'}
                    options={BathRooms}
                />

                <InputElement name="deed_number" placeholder='Please enter deed number' label={'Title Deed / Oqod / Initial Contract of Sales'} />

                <Button type="submit" className="w-full">
                    Save and Continue
                </Button>
                <Button variant="outline" type='button' onClick={() => router.push(`/advertise/basic-details`)} className="w-full">
                    Go Back
                </Button>
            </form>
        </Form>
    )
}

export default RentPropertyDetailsForm
