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
    selectedAmenities: TOption[]
    setSelectedAmenities: Dispatch<SetStateAction<TOption[]>>
}
const AmenitiesCheckbox = ({ name, options, selectedAmenities, setSelectedAmenities }: Props) => {

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
        setSelectedAmenities([...selectedAmenities, checkedOption])
    }

    return (
        <FormField control={control} name='amenities' render={() => (
            <FormItem className='grid grid-cols-2 space-y-0 gap-y-4'>
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

export default AmenitiesCheckbox



// {
//     options.map((option, i) => (
//         <FormField
//             key={i}
//             control={control}
//             name={option.value}
//             render={({ field }) => (
//                 <FormItem key={i} className='grid grid-cols-2 gap-x-2 gap-y-5' >
//                     <div key={i} className='flex items-center space-x-2' >
//                         <FormControl>
//                             <Checkbox name={option.value} id={option.value} onCheckedChange={handleCheckboxChange}
//                             />
//                             <label
//                                 htmlFor={option.value}
//                                 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                             >
//                                 {option.label}
//                             </label>
//                         </FormControl>
//                     </div>
//                 </FormItem>
//             )}
//         />
//     ))
// }