'use client'

import { CardHeader, CardContent, Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import InputElement from '@/components/forms/elements/input-element'
import CustomInputElement from '@/components/forms/elements/custom-input-element'
import { useSignUp } from '@/data/hooks/useAuthClient'
import Link from 'next/link'
import { PageRoutes } from '@/constants/page-routes'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

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
  password: z
    .string({
      required_error: 'Please enter a password!'
    })
    .min(8)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{8,}$/,
      'Please enter a combination of uppercase letters, lowercase letters, numbers, and symbols.'
    )
})
const Page = () => {
  const searchParams = useSearchParams()

  const email = searchParams.get('email')
  const firstName = searchParams.get('firstName')
  const lastName = searchParams.get('lastName')

  const { isPending: isLoading, mutate: createUser } = useSignUp()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  useEffect(() => {
    if (email) {
      form.setValue('email', email)
    }
    if (firstName) {
      form.setValue('firstName', firstName)
    }
    if (lastName) {
      form.setValue('lastName', lastName)
    }
  }, [])

  function onSubmit(values: z.infer<typeof formSchema>) {
    createUser({
      ...values
    })
  }

  return (
    <section className="auth_section">

      <Card className="auth_card">
        <CardHeader>
          <h1 className="auth_head">Sign Up</h1>
          <p className="auth_subhead">Create Account</p>
        </CardHeader>
        <CardContent>
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
              <Button disabled={isLoading} className="w-full" type="submit">
                {isLoading ? 'Loading...' : 'Sign Up'}
              </Button>
              <p className="mt-4 text-center">
                Already have an account?{' '}
                <Link className="text-primary underline" href={`${PageRoutes.SIGNIN}?email=${email ? email : ''}`}>
                  Sign in here
                </Link>
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  )
}

export default Page
