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
}

const InputElement = ({ name, label, description, placeholder, type = 'text' }: Props) => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {
              type === 'number' ? (
                <Input type={type} placeholder={placeholder} {...field} onChange={event => field.onChange(+event.target.value)} />
              ) : (
                <Input type={type} placeholder={placeholder} {...field} />
              )
            }
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default InputElement
