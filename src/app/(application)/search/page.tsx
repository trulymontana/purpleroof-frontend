"use client"

import { Button } from "@/components/ui/button"
import TabRadioGroup from "@/components/forms/elements/tab-radio-group"
import { amenities, bathRooms, bedRooms, commercialTypes, residentalTypes, typesOfProperties } from "@/constants/advertise"
import { Form } from "@/components/ui/form"
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { PropertyTypeEnum } from "@/constants/enums"
import SelectElement from "@/components/forms/elements/select-element"
import { searchCategories } from "@/constants/search"
import SliderElement from "@/components/forms/elements/slider-element"
import { useState } from "react"
import makeAnimated from 'react-select/animated';
import MultiSelectElement from "@/components/forms/elements/multiselect-element"

const animatedComponents = makeAnimated();

const formSchema = z.object({
    propertyFor: z
        .string({
            required_error: 'Please select a category'
        }).optional(),
    location: z.string({
        required_error: 'Title should not be empty!'
    }).optional(),
    category: z.string({
        required_error: 'Title should not be empty!'
    }).optional(),
    propertyType: z.string({
        required_error: 'Please select a property type!'
    }).optional(),
    bed: z.string({
        required_error: 'Please select a property type!'
    }).optional(),
    bath: z.string({
        required_error: 'Please select a property type!'
    }).optional(),
    amenities: z.string({
        required_error: 'Please select a property type!'
    }).optional(),
    propertyCategory: z.string({
        required_error: 'Please select a property option'
    }).optional()
})
const Page = () => {
    const [values, setValues] = useState([0, 1200])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            propertyFor: PropertyTypeEnum.RESIDENTIAL
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log({ values })
    }

    const data = form.getValues();

    const propertyFor = form.watch("propertyFor")

    return (
        <section className="relative h-auto min-h-screen">
            <div className="absolute inset-0 -z-10 h-auto min-h-screen w-full bg-indigo-600 bg-opacity-25 bg-search bg-cover backdrop-opacity-10" />
            <div
                className="t-0 absolute top-0 -z-10 h-full w-full opacity-75"
                style={{
                    background: 'linear-gradient(to bottom, #795695 30%, #795695 70%)'
                }}
            ></div>
            <div className="absolute inset-0 bg-black opacity-50" />
            <div className="relative px-8 py-12 text-center flex flex-col gap-4">
                <h1 className="text-white text-5xl font-bold mb-2">Search a Property Sale or Rent in UAE</h1>
                <div className="flex items-center space-x-4 mb-8 justify-center mt-10">
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white flex flex-col gap-2 rounded-xl w-3/4 mx-auto">
                        <div className="w-1/2 mx-auto py-4">
                            <TabRadioGroup name="propertyFor" options={typesOfProperties} />
                        </div>
                        <div className="p-4 gap-5 rounded-lg flex flex-col items-center ">
                            <div className="w-full flex items-center gap-4">
                                <div className="flex-1">
                                    <MultiSelectElement name="location" placeholder="Please select a location" options={amenities} />
                                </div>
                                <div className="flex-1">
                                    <SelectElement name="category" options={searchCategories} placeholder="Please select a category" />
                                </div>
                                <div className="flex-1">
                                    <MultiSelectElement name="propertyType" options={propertyFor === PropertyTypeEnum.RESIDENTIAL ? residentalTypes : commercialTypes} placeholder="Please select a Property Type" />
                                </div>
                            </div>
                            <div className="w-full flex items-center justify-center gap-4">
                                {
                                    propertyFor === PropertyTypeEnum.RESIDENTIAL && (
                                        <>
                                            <div className="flex-1">
                                                <SelectElement name="bed" placeholder="Bed" options={bedRooms} />
                                            </div>
                                            <div className="flex-1">
                                                <SelectElement name="bath" placeholder="Bath" options={bathRooms} />
                                            </div>
                                            <div className="flex-1">
                                                <MultiSelectElement name="amenities" placeholder="Select Amenities" options={amenities} />
                                            </div>
                                        </>
                                    )
                                }
                                <div className="w-1/4">
                                    <SliderElement
                                        values={values}
                                        setValues={setValues}
                                        name="priceRange"
                                        min={values[0]}
                                        minStepsBetweenThumbs={10}
                                        max={values[1]}
                                        step={1}
                                    />
                                </div>
                            </div>
                            <Button className="w-full bg-primary">Find</Button>
                        </div>
                    </form>
                </Form>
            </div>

        </section>

    )
}

export default Page