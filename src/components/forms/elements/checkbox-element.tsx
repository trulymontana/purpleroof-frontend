import { Checkbox } from '@/components/ui/checkbox'
import { FormField, FormItem } from '@/components/ui/form'
import { useFormContext } from 'react-hook-form'

type TOption = {
    label: string
    value: string
    checked: boolean
}

interface Props {
    name: string
    label?: string
    options: TOption[]
}
const AmenitiesCheckbox = ({ name, options }: Props) => {

    const { control, setValue } = useFormContext();

    const handleCheckboxChange = (event: any) => {
        const updatedOptions = options.map(option => ({
            ...option,
            checked: option.value === event.target.value ? event.target.checked : option.checked
        }))

        setValue(name, updatedOptions)
    }

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className='grid grid-cols-2 gap-x-2 gap-y-5' >
                    {
                        options.map((option, i) => (
                            <div key={i} className='flex items-center space-x-2'>
                                <Checkbox name={option.value} id={option.value} onChange={handleCheckboxChange}
                                    checked={option.checked} onClick={() => option.checked = true} />
                                <label
                                    htmlFor={option.value}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    {option.label}
                                </label>
                            </div>
                        ))
                    }
                </FormItem>
            )}
        />
    )
}

export default AmenitiesCheckbox