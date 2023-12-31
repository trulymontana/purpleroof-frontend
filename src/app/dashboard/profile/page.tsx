"use client"

import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { LocalStorageKeys } from "@/constants/local-storage-keys"
import { TOption, User } from "@/constants/types"
import Link from "next/link"
import { PageRoutes } from "@/constants/page-routes"
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import InputElement from "@/components/forms/elements/input-element"
import PhoneNumberInputElement from "@/components/forms/elements/phone-number-input"
import FileUploader from "@/components/forms/elements/file-uploader"
import MultiSelectElement from "@/components/forms/elements/multiselect-element"
import { emirateOptions, emiratesWithLocations } from "@/constants/advertise"
import { useEffect, useState } from "react"
import { Separator } from "@/components/ui/separator"
import { useCreateAgentMutation } from "@/data/hooks/useAgentsClient"
import { getValuesFrom } from "@/lib/utils"
import { useGetLocations } from "@/data/hooks/useLocationsClient"

const formSchema = z.object({
    agency: z.string({
        required_error: "Please enter your name"
    }),
    contactNumber: z.string({
        required_error: 'Please enter a valid contact number.'
    }).min(10, {
        message: 'Contact number must be at least 10 characters.'
    }),
    realEstateLicense: z.string({
        required_error: 'Please upload your real estate license.'
    }),
    emirates: z.any().optional(),
    locations: z.any().optional()
})



const Page = () => {

    const [locations, setLocations] = useState<TOption[]>([]);

    const storedValue = localStorage.getItem(LocalStorageKeys.USER)

    const { data: locationsData } = useGetLocations();

    const { mutate: createAgent, isPending: isLoading } = useCreateAgentMutation()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        delete values.emirates
        values.locations.length > 0 && (values.locations = getValuesFrom(values.locations))
        values.locations.length > 0 && (values.locations = values.locations.map((location: string) => Number(location)))
        createAgent({
            ...values
        })
    }

    const emirates: TOption[] = form.watch('emirates')

    let emirateValues: string[];

    emirates?.length > 0 && (emirateValues = getValuesFrom(emirates))

    const user: User = storedValue !== null && JSON.parse(storedValue)

    const filterLocations = (emirateValues: string[]) => {
        if (locationsData && locationsData?.length > 0 && emirateValues?.length > 0) {

            const filteredLocations = locationsData?.filter((item) => emirateValues?.includes(item.emirate)).map((data) => ({ label: data.name, value: data.id.toString() }))
            setLocations(filteredLocations)
        }
    }

    useEffect(() => {
        filterLocations(emirateValues)
    }, [emirates]);


    return (
        <div className="w-full px-6 py-10 space-y-8">
            <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                    <AvatarImage alt="User Avatar" src="/placeholder-avatar.jpg" />
                    <AvatarFallback>{user.firstName.charAt(0) + user.lastName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1 text-lg">
                    <div className="font-bold text-2xl">{user.firstName + " " + user.lastName}</div>
                </div>
            </div>
            <div className="space-y-6">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>User Details</CardTitle>
                        <CardDescription>Overview of user information.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">First Name</Label>
                            <Input disabled id="username" value={user.firstName} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="username">Last Name</Label>
                            <Input disabled id="username" value={user.lastName} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input disabled id="email" value={user?.email} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <Input disabled id="role" value={user?.role.toLocaleLowerCase()} />
                        </div>
                        <div>
                            <Link className="text-primary hover:underline" href={PageRoutes.FORGOT_PASSWORD}>
                                Forgot Password?
                            </Link>
                        </div>
                        <div className="flex items-center justify-between mt-6">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant={"outline"}>Apply as Agent</Button>
                                </DialogTrigger>
                                <DialogContent className='sm:max-w-[425px]'>
                                    <DialogHeader>
                                        <DialogTitle>
                                            <h2 className="text-xl font-semibold capitalize">Apply as Agent</h2>
                                        </DialogTitle>
                                        <DialogDescription>Fill the following details to apply as a agent</DialogDescription>

                                    </DialogHeader>
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                                            <InputElement name='agency' label='Agency Name' />
                                            <PhoneNumberInputElement name='contactNumber' label='Contact Number' />
                                            <FileUploader folder="agent" form={form} name="realEstateLicense" label="Real Estate License" />
                                            <MultiSelectElement label="Emirates" name="emirates" placeholder="Please select emirates" options={emirateOptions} />
                                            <MultiSelectElement label="Locations" disabled={!emirates || emirates.length === 0} name="locations" placeholder={!emirates || emirates?.length === 0 ? "Please select atleast one emirate" : "Please select locations"} options={locations!} />
                                            <Separator />
                                            <Button disabled={isLoading} type="submit" className="w-full">{isLoading ? "Applying..." : "Apply"}</Button>
                                        </form>
                                    </Form>
                                </DialogContent>
                            </Dialog>
                            <Button>Submit</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Page