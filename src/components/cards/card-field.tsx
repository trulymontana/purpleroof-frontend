"use client"

import { cn } from "@/lib/utils"

interface Props {
    label: string
    value: any
    className?: string
}

const CardField = ({ label, value, className }: Props) => {
    return (
        <div className="flex justify-between">
            <p>{label}</p>
            <p className={cn("font-semibold capitalize", className)}>{value}</p>
        </div>
    )
}

export default CardField