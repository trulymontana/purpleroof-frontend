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
import { financeTypes, completionStatus, emirate, propertyType, transactionTypes, educationOptions, maritalStatusOptions } from '@/constants/mortgage'
import PhoneNumberInputElement from '../../../../components/forms/elements/phone-number-input'

interface Props {
    mortgageId: string
}

const formSchema = z.object({
    name: z.string({
        required_error: 'Please enter your name'
    }),
    email: z.string({
        required_error: 'Please enter your email'
    }),
    contact: z.string({
        required_error: 'Please enter your contact no.'
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
})

const CustomerInfoForm = ({ mortgageId }: Props) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <Form {...form}>
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

                <h2 className='font-bold'>Home Country References</h2>

                <Button type="submit" className='w-full'>Next</Button>
            </form>
        </Form>
    )
}

export default CustomerInfoForm
