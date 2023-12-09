import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Calendar as CalenderIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'

import { Popover } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import React from 'react'
import { useFormContext } from 'react-hook-form'

interface Props {
  name: string
  label: string
  description?: string
  disabled?: boolean
}

const DatePickerElement = ({ name, label, description, disabled = false }: Props) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-[240px] pl-3 text-left font-normal',
                    !field.value && 'text-muted-foreground',
                  )}
                >
                  {field.value ? (
                    field?.value?.toLocaleDateString()
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalenderIcon className="ml-auto h-4 w-4" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-slate-950 text-white/80" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={!disabled ? ((date) =>
                  date > new Date() || date < new Date('1900-01-01')) : ((date) => date < new Date('1900-01-01'))
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default DatePickerElement
