import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useFormContext } from 'react-hook-form'

interface Props {
  name: string
  label: string
  description?: string
  placeholder?: string
  type?: string
  isDisabled?: boolean
}

const InputElement = ({ name, label, description, placeholder, isDisabled = false }: Props) => {
  const { control, register } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type="text" placeholder={placeholder} {...field} disabled={isDisabled} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default InputElement
