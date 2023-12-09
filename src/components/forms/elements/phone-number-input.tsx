import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { PhoneInput } from 'react-international-phone'

interface Props {
    name: string
    label: string
    description?: string
    placeholder?: string
    type?: string
}

const PhoneNumberInputElement = ({ name, label, description, placeholder, type = "text" }: Props) => {
    const { control } = useFormContext()

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <PhoneInput
                            defaultCountry="us"
                            value={field.value}
                            onChange={field.onChange}
                            inputStyle={{
                                width: '100%',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                paddingLeft: '10px',
                            }}
                            style={{
                                height: 40
                            }}
                        />
                    </FormControl>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default PhoneNumberInputElement
