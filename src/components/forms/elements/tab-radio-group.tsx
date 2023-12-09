import React from 'react'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useFormContext } from 'react-hook-form'
import { TOption } from '@/constants/types'


interface Props {
    name: string
    options: TOption[]
    description?: string
    placeholder?: string
    className?: string
}

const TabRadioGroup = ({
    name,
    options,
    className
}: Props) => {
    const { control } = useFormContext()
    return (
        <>
            <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <FormItem  >
                        <FormControl>
                            <RadioGroup
                                defaultValue={field.value}
                                onValueChange={field.onChange}
                                className={`flex items-center justify-between bg-gray-100 rounded-xl`}
                            >
                                {options.map((option) => (
                                    <FormItem
                                        key={option.value}
                                        className="flex items-center w-full space-x-1 space-y-0"
                                    >
                                        <FormControl>
                                            <RadioGroupItem value={option.value} className="hidden" />
                                        </FormControl>
                                        <FormLabel className={`cursor-pointer  w-full font-medium text-[16px] rounded-xl text-center py-4 px-2 ${field.value === option.value ? "bg-[#613e83] text-white" : ""}`}>
                                            {option.label}
                                        </FormLabel>
                                    </FormItem>
                                ))}
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    )
}

export default TabRadioGroup
