"use client"

import { CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form } from '@/components/ui/form'
import * as z from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import InputElement from "@/components/forms/elements/input-element"
import CustomInputElement from "@/components/forms/elements/custom-input-element"
import { useSignUp } from "@/data/hooks/useAuthClient"

const formSchema = z.object({
  firstName: z.string({
    required_error: 'Please enter your first name!'
  }),
  lastName: z.string({
    required_error: 'Please enter your last name!'
  }),
  email: z.string({
    required_error: 'Please enter your email!'
  }),
  password: z.string({
    required_error: 'Please enter a password!'
  }).min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{8,}$/, 'Please enter a combination of uppercase letters, lowercase letters, numbers, and symbols.'),
})
const Page = () => {

  const { mutate: createUser } = useSignUp();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    createUser({
      ...values
    })
  }

  return (
    <main
      className="flex items-center justify-center px-4 py-8 bg-white dark:bg-gray-800 min-h-screen"
    >
      <Card className="max-w-md w-full mx-auto  bg-opacity-75">
        <CardHeader>
          <h1 className="text-4xl font-bold text-center">Sign Up</h1>
        </CardHeader>
        <CardContent className="p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 p-4">
              <div className="space-y-2">
                <InputElement name="firstName" placeholder="John" label="First Name" />
              </div>
              <div className="space-y-2">
                <InputElement name="lastName" placeholder="Wick" label="Last Name" />
              </div>
              <div className="space-y-2">
                <CustomInputElement name="email" label="Email" type="email" />
              </div>
              <div className="space-y-2">
                <CustomInputElement name="password" label="Password" type="password" />
              </div>
              <Button className="w-full" type="submit">
                Sign Up
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  )
}

export default Page