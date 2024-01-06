'use client'

import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar'
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LocalStorageKeys } from '@/constants/local-storage-keys'
import { TOption, User } from '@/constants/types'
import Link from 'next/link'
import { PageRoutes } from '@/constants/page-routes'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import InputElement from '@/components/forms/elements/input-element'
import PhoneNumberInputElement from '@/components/forms/elements/phone-number-input'
import FileUploader from '@/components/forms/elements/file-uploader'
import MultiSelectElement from '@/components/forms/elements/multiselect-element'
import { emirateOptions } from '@/constants/advertise'
import { useEffect, useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { useCreateAgentMutation } from '@/data/hooks/useAgentsClient'
import { getValuesFrom } from '@/lib/utils'
import { useGetLocations } from '@/data/hooks/useLocationsClient'
import { EmirateEnum, UserRoleEnum } from '@/constants/enums'
import { useGetAgentApplications } from '@/data/hooks/useUsersClient'
import { Locate, Phone } from 'lucide-react'
import { useGetUserDetails, useGetUserRole } from '@/data/hooks/useAuthClient'
import Loader from '@/components/Loader'

const formSchema = z.object({
  agency: z.string().optional(),
  contactNumber: z
    .string({
      required_error: 'Please enter a valid contact number.'
    })
    .min(10, {
      message: 'Contact number must be at least 10 characters.'
    }),
  realEstateLicense: z.string({
    required_error: 'Please upload your real estate license.'
  }),
  emirates: z.any().optional(),
  locations: z.any().optional()
})

const Page = () => {
  const [locations, setLocations] = useState<TOption[]>([])

  const { data: userDetails, loading } = useGetUserDetails();
  const { mutate: createAgent, isPending: isLoading } = useCreateAgentMutation()
  const { data: agentApplicationDetails } = useGetAgentApplications()

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

  let emirateValues: any

  emirates?.length > 0 && (emirateValues = getValuesFrom(emirates))

  const { data: locationOptions } = useGetLocations(emirateValues);

  // useEffect(() => {
  //   filterLocations(emirateValues)
  // }, [emirates])



  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <Loader />
      </div>
    )
  }

  const { firstName, lastName, role, email } = userDetails;

  return (
    <div className="w-full space-y-8 px-6 py-10">
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage alt="User Avatar" src="/placeholder-avatar.jpg" />
          <AvatarFallback>{firstName?.charAt(0) + lastName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="grid gap-1 text-lg">
          <div className="text-2xl font-bold">{firstName + ' ' + lastName}</div>
        </div>
      </div>
      <div className="space-y-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-primary">User Details</CardTitle>
            <CardDescription>Overview of user information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-x-2">
              <Label htmlFor="username">First Name</Label>
              <Input disabled id="username" value={firstName} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Last Name</Label>
              <Input disabled id="username" value={lastName} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input disabled id="email" value={email} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input disabled id="role" value={role.toLocaleLowerCase()} />
            </div>
            <div className="mt-6 flex items-center justify-between">
              {role === UserRoleEnum.GENERAL_USER && !agentApplicationDetails && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant={'outline'}>Apply as Agent</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>
                        <h2 className="text-xl font-semibold capitalize">Apply as Agent</h2>
                      </DialogTitle>
                      <DialogDescription>Fill the following details to apply as a agent</DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                        <InputElement name="agency" label="Agency Name (optional)" />
                        <PhoneNumberInputElement name="contactNumber" label="Contact Number" />
                        <FileUploader folder="agent" form={form} name="realEstateLicense" label="Real Estate License" />
                        <MultiSelectElement
                          label="Emirates"
                          name="emirates"
                          placeholder="Please select emirates"
                          options={emirateOptions}
                        />
                        <MultiSelectElement
                          label="Locations"
                          disabled={!emirates || emirates.length === 0}
                          name="locations"
                          placeholder={
                            !emirates || emirates?.length === 0
                              ? 'Please select atleast one emirate'
                              : 'Please select locations'
                          }
                          options={locationOptions || [{ label: "Dubai", value: "1" }]}
                        />
                        <Separator />
                        <Button disabled={isLoading} type="submit" className="w-full">
                          {isLoading ? 'Applying...' : 'Apply for Agent'}
                        </Button>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </CardContent>
        </Card>

        {agentApplicationDetails && <Card className="w-1/4 rounded-xl bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-primary">Agent Details</CardTitle>
            <CardDescription>Overview of agent information.</CardDescription>
          </CardHeader>
          <CardContent>
            {agentApplicationDetails?.agency && (
              <p className="mt-2 text-gray-500">Agency Name: {agentApplicationDetails?.agency}</p>
            )}
            {agentApplicationDetails?.contactNumber && (
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <Phone className="mr-2 h-5 w-5 text-gray-500" />
                <span>Contact: {agentApplicationDetails?.contactNumber}</span>
              </div>
            )}
            <div className="mt-4 flex">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full" variant="outline">
                    <Locate className="mr-2 h-5 w-5 text-gray-500" />
                    View Locations
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px]">
                  <DialogHeader>
                    <DialogTitle>Locations</DialogTitle>
                  </DialogHeader>
                  <div className="grid max-h-[500px] grid-cols-2 gap-4 overflow-y-auto py-4">
                    {agentApplicationDetails?.locations.map((location, i) => {
                      return (
                        <Card key={i}>
                          <CardHeader>
                            <CardTitle>{location.name}</CardTitle>
                          </CardHeader>
                        </Card>
                      )
                    })}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>}
      </div>
    </div>
  )
}

export default Page
