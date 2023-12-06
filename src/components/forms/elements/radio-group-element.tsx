import React from 'react'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useFormContext } from 'react-hook-form'

type TOption = {
  label: string
  value: string
}

interface Props {
  name: string
  label: string
  options: TOption[]
  description?: string
  placeholder?: string
  handleChange?: (e: any) => void
}

const RadioGroupElement = ({
  name,
  label,
  description,
  options,
  placeholder,
  handleChange
}: Props) => {
  const { control } = useFormContext()
  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="space-y-3" >
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <RadioGroup
                defaultValue={field.value}
                // onValueChange={field.onChange}
                onValueChange={handleChange}
                // onChange={handleChange}
                className="flex items-center gap-10"
              >
                {options.map((option) => (
                  <FormItem
                    key={option.value}
                    className="flex items-center space-x-3 space-y-0"
                  >
                    <FormControl>
                      <RadioGroupItem value={option.value} />
                    </FormControl>
                    <FormLabel className="font-normal">
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

export default RadioGroupElement
