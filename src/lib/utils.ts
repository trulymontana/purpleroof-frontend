import { TOption } from '@/constants/types'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function nullCheckAndMerge(result: any, jsonString: string | null) {
  if (jsonString !== null) {
    const parsedResult = JSON.parse(jsonString)
    Object.keys(parsedResult).forEach((key) => {
      if (parsedResult[key] !== '') {
        result[key] = parsedResult[key]
      }
    })
  }
}

export const getValuesFrom = (arr: TOption[]) => {
  return arr.map((item) => item.value)
}
