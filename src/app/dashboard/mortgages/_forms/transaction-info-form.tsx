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
import { financeTypes, completionStatus, emirate, propertyType, transactionTypes } from '@/constants/mortgage'
import { usePathname, useRouter } from 'next/navigation'
import { PageRoutes } from '@/constants/page-routes'

const formSchema = z.object({
    property_type: z.string({
        required_error: 'Please select a property type.'
    }),
    completion_status: z.string({
        required_error: "Please select completion status."
    }),
    emirate: z.string({
        required_error: "Please select a emirate."
    }),
    transaction_type: z.string({
        required_error: 'Please select a transaction type.'
    }),
    additional_details: z.string().optional()
})

interface Props {
    mortgageId: string
    onSave: (step: string, values: any) => void
}

const TransactionInfoForm = ({ mortgageId, onSave }: Props) => {

    const router = useRouter();

    const storedValue = localStorage.getItem('mortgage/transaction-info')
    const defaultValues: z.infer<typeof formSchema> = storedValue !== null && JSON.parse(storedValue)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        onSave("mortgage/transaction-info", values)
        router.push(`${PageRoutes.dashboard.MORTGAGES}/${mortgageId}/customer-info`)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <SelectElement name='property_type' label='Property Type' options={propertyType} />
                <SelectElement name='completion_status' label='Completion Status' options={completionStatus} />
                <SelectElement name='emirate' label='Emirate' options={emirate} />
                <RadioGroupElement
                    name="transaction_type"
                    label={'Transaction Type'}
                    options={transactionTypes}
                    className='flex-col'
                />
                <InputElement name='additional_details' label='Additional Details' />
                <Button type="submit" className='w-full'>Next</Button>
            </form>
        </Form>
    )
}

export default TransactionInfoForm
