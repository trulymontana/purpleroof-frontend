"use client"

import { Card, CardContent, CardHeader } from '../ui/card'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { PhoneCall } from 'lucide-react'
import { Separator } from '../ui/separator'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import InputElement from '../forms/elements/input-element'
import Image from 'next/image'
import TextAreaElement from '../forms/elements/text-area-element'
import { Form } from '../ui/form'
import PhoneNumberInputElement from '../forms/elements/phone-number-input'


const formSchema = z.object({
    name: z.string({
        required_error: "Please enter your name"
    }),
    email: z.string({
        required_error: "Please enter your email"
    }).email(),
    phoneNumber: z.string({
        required_error: 'Please enter a valid phone number.'
    }).min(10, {
        message: 'Phone number must be at least 10 characters.'
    }),
    message: z.string().optional()
})

const ContactAgentCard = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            message: `I would like to inquire about your property 32. Please contact me at your earliest convenience.`
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log({ values })
    }

    return (
        <Card className="w-full">
            <CardHeader className="mb-4">
                <h2 className="text-2xl font-semibold">Contact Agent</h2>
            </CardHeader>
            <CardContent>
                <div className="mb-4 flex items-center space-x-4">
                    <div className="flex flex-col">
                        <h3 className="text-lg font-medium">John Doe</h3>
                        <p className="text-sm text-gray-500">Licensed Real Estate Agent</p>
                    </div>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="w-full">Email Agent</Button>
                    </DialogTrigger>
                    <DialogContent className='sm:max-w-[425px]'>
                        <DialogHeader>
                            <DialogTitle>
                                <h2 className="text-xl font-semibold capitalize">Email Agent for more information</h2>
                            </DialogTitle>
                            <DialogDescription></DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                                <InputElement name='name' label='Name' />
                                <InputElement name='email' label='Email' />
                                <PhoneNumberInputElement name='phoneNumber' label='Phone Number' />
                                <TextAreaElement label='Message' name='message' />
                                <Button className="w-full">Send Email</Button>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="mt-2 w-full">Call Agent</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Contact Us</DialogTitle>
                            <DialogDescription>
                                Feel free to call agent for getting more info about the property.
                            </DialogDescription>
                        </DialogHeader>
                        <div>
                            <div className="text-lg mb-4">
                                <p className="font-medium">18 Bricks Real Estate</p>
                            </div>
                            <div className="flex items-center mb-4">
                                <div className='p-2 rounded-full bg-emerald-600/10  mr-2'>
                                    <PhoneCall size={20} className="text-green-500" />
                                </div>
                                <span className="text-lg font-medium ">
                                    +971-55-9053828
                                </span>
                            </div>
                            <Separator className="my-4" />
                            <div className="text-lg mb-4">
                                <p>Agent: Vinay Raju Daryani</p>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

            </CardContent>
        </Card>
    )
}

export default ContactAgentCard