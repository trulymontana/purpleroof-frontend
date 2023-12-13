'use client'
import React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import { Form } from '@/components/ui/form'

import * as z from 'zod'
import InputElement from '../../../../components/forms/elements/input-element'
import TextAreaElement from '../../../../components/forms/elements/text-area-element'
import SelectElement from '../../../../components/forms/elements/select-element'
import SwitchElement from '../../../../components/forms/elements/switch-element'
import RadioGroupElement from '../../../../components/forms/elements/radio-group-element'
import DatePickerElement from '../../../../components/forms/elements/date-picker-element'
import ComboboxElement from '../../../../components/forms/elements/combobox-element'
import { Checkbox } from '../../../../components/ui/checkbox'
import FileUploader from '../../../../components/forms/elements/file-uploader'
import { financeTypes, completionStatus, emirate, propertyType, transactionTypes, educationOptions, maritalStatusOptions, relationshipOptions } from '@/constants/mortgage'
import PhoneNumberInputElement from '../../../../components/forms/elements/phone-number-input'
import { BackButton } from '@/components/navigation/back-button'
import { PageRoutes } from '@/constants/page-routes'


const formSchema = z.object({
    name: z.string({
        required_error: 'Please enter your name'
    }),
    email: z.string({
        required_error: 'Please enter your email'
    }),
    contact: z
        .string({
            required_error: 'Please enter a valid phone number.'
        })
        .min(10, {
            message: 'Phone number must be at least 10 characters.'
        }),
    education: z.string({
        required_error: 'Please select your education qualification'
    }),
    marital_status: z.string({
        required_error: 'Please select your marital status'
    }),
    favorite_city: z.string({
        required_error: 'Please enter your favorite city'
    }),
    number_of_family_member_in_uae: z.string({
        required_error: 'Please enter your number of family member in UAE'
    }),
    years_in_uae: z.string({
        required_error: 'Please enter your number years in UAE'
    }),
    annual_rental_income: z.string({
        required_error: 'Please enter your annual rental income'
    }),
    uae_residence_address: z.string({
        required_error: 'Please enter your UAE residence address'
    }),
    home_country_address: z.string({
        required_error: 'Please enter your home country address'
    }),
    home_country_reference_1: z.object({
        name: z.string({
            required_error: "Please enter name"
        }),
        relationship: z.string({
            required_error: "Please enter relationship"
        }),
        mobile: z.string({
            required_error: "Please enter mobile number"
        }).min(10, {
            message: 'Phone number must be at least 10 characters.'
        }),
    }),
    home_country_reference_2: z.object({
        name: z.string({
            required_error: "Please enter name"
        }),
        relationship: z.string({
            required_error: "Please enter relationship"
        }),
        mobile: z.string({
            required_error: "Please enter mobile number"
        }).min(10, {
            message: 'Phone number must be at least 10 characters.'
        }),
    }),
    uae_reference_1: z.object({
        name: z.string({
            required_error: "Please enter name"
        }),
        relationship: z.string({
            required_error: "Please enter relationship"
        }),
        mobile: z.string({
            required_error: "Please enter mobile number"
        }).min(10, {
            message: 'Phone number must be at least 10 characters.'
        }),
    }),
    uae_reference_2: z.object({
        name: z.string({
            required_error: "Please enter name"
        }),
        relationship: z.string({
            required_error: "Please enter relationship"
        }),
        mobile: z.string({
            required_error: "Please enter mobile number"
        }).min(10, {
            message: 'Phone number must be at least 10 characters.'
        }),
    }),
})

interface Props {
    mortgageId: string
    onSave: (step: string, values: any) => void
}

const CustomerInfoForm = ({ mortgageId, onSave }: Props) => {

    const storedValue = localStorage.getItem('mortgage/customer-info')
    const defaultValues: z.infer<typeof formSchema> = storedValue !== null && JSON.parse(storedValue)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log({ values })
        // onSave("mortgage/customer-info", values)
    }

    return (
        <Form {...form}>
            <h1 className='text-4xl font-bold text-black/80'>Customer Info</h1>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <InputElement name='name' label='Name' />
                <InputElement name='email' label='Email' />
                <PhoneNumberInputElement name='contact' label='Contact No.' />
                <SelectElement name='education' label='Education' options={educationOptions} />
                <SelectElement name='marital_status' label='Marital Status' options={maritalStatusOptions} />
                <InputElement name='favorite_city' label='Favorite City' />
                <InputElement name='number_of_family_member_in_uae' label='Number of Family Members in UAE' type='number' />
                <InputElement name='years_in_uae' label='Years in UAE' />
                <InputElement name='annual_rental_income' label='Annual Rental Income' />
                <InputElement name='uae_residence_address' label='UAE Residence Address' />
                <InputElement name='home_country_address' label='Home Country Address' />

                <h2 className='font-bold text-xl pt-5 '>HOME COUNTRY REFERENCES</h2>

                <InputElement name='home_country_reference_1.name' label='Name' />
                <SelectElement name='home_country_reference_1.relationship' label='Relationship' options={relationshipOptions} />
                <PhoneNumberInputElement name='home_country_reference_1.mobile' label='Mobile' />

                <div className='h-[3px] bg-black/20 w-full' />

                <InputElement name='home_country_reference_2.name' label='Name' />
                <SelectElement name='home_country_reference_2.relationship' label='Relationship' options={relationshipOptions} />
                <PhoneNumberInputElement name='home_country_reference_2.mobile' label='Mobile' />

                <h2 className='font-bold text-xl pt-5'>PERSONAL REFERENCES IN UAE</h2>
                <InputElement name='uae_reference_1.name' label='Name' />
                <SelectElement name='uae_reference_1.relationship' label='Relationship' options={relationshipOptions} />
                <PhoneNumberInputElement name='uae_reference_1.mobile' label='Mobile' />

                <div className='h-[3px] bg-black/20 w-full' />

                <InputElement name='uae_reference_2.name' label='Name' />
                <SelectElement name='uae_reference_2.relationship' label='Relationship' options={relationshipOptions} />
                <PhoneNumberInputElement name='uae_reference_2.mobile' label='Mobile' />

                <Button type="submit" className='w-full'>Next</Button>
                <BackButton route={`${PageRoutes.dashboard.MORTGAGES}/${mortgageId}/transaction-info`} />
            </form>
        </Form>
    )
}

export default CustomerInfoForm
