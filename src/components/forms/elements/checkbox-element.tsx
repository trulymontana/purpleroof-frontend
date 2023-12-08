import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Dispatch, SetStateAction, useState } from 'react'
import { useFormContext } from 'react-hook-form'

type TOption = {
    label: string
    value: string
}

interface Props {
    name: string
    label?: string
    options: TOption[]
    selectedBoxes: TOption[]
    setSelectedBoxes: Dispatch<SetStateAction<TOption[]>>
    classNames?: string
}
const MultiSelectCheckbox = ({ name, options, selectedBoxes, setSelectedBoxes, classNames }: Props) => {

    const { control, setValue } = useFormContext();

    const handleCheckboxChange = (checkedOption: TOption, checked: boolean) => {
        // const updatedOptions = options.map(option => {
        //     if (option.value === checkedOption.value) {
        //         return { ...option, checked }
        //     }
        //     return option
        // })

        // setValue(name, updatedOptions)
        // setSelectedAmenities(updatedOptions);
        setSelectedBoxes([...selectedBoxes, checkedOption])
    }

    return (
        <FormField control={control} name={name} render={() => (
            <FormItem className={`grid ${classNames} space-y-0 gap-y-4`}>
                {options.map((option) => (
                    <FormField key={option.value} control={control} name='amenities' render={({ field }) => {
                        return (
                            <FormItem key={option.value} className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                    <Checkbox
                                        // @ts-ignore
                                        checked={field.value?.some((item: { item: TOption }) => item.value === option.value)}
                                        onCheckedChange={(checked) => {
                                            handleCheckboxChange(option, Boolean(checked))
                                        }}
                                    />
                                </FormControl>
                                <FormLabel className="font-normal">
                                    {option.label}
                                </FormLabel>
                            </FormItem>
                        )
                    }} />
                ))}
            </FormItem>
        )} />
    )
}

export default MultiSelectCheckbox
