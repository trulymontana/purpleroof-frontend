'use client'

import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { PageRoutes } from '@/constants/page-routes'
import CustomInputElement from '@/components/forms/elements/custom-input-element'
import * as z from 'zod'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z
  .object({
    email: z.string({
      required_error: 'Please enter your email!'
    }),
    newPassword: z.string({
      required_error: 'Please enter your new password!'
    }),
    confirmPassword: z.string({
      required_error: 'Please re-enter your password'
    })
  })
  .refine(
    (values) => {
      return values.newPassword === values.confirmPassword
    },
    {
      message: 'Passwords must match!',
      path: ['confirmPassword']
    }
  )

const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ values })
  }

  return (
    <main className="auth_section">
      <Card className="auth_card">
        <CardHeader>
          <h1 className="auth_head">Forgot Password</h1>
          <p className="auth_subhead">Reset your password!</p>
        </CardHeader>
        <CardContent className="">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 p-4">
              <div className="space-y-2">
                <CustomInputElement name="email" label="Email" type="email" />
              </div>
              <div className="space-y-2">
                <CustomInputElement name="newPassword" label="New Password" type="password" />
              </div>
              <div className="space-y-2">
                <CustomInputElement name="confirmPassword" label="Confirm Password" type="password" />
              </div>
              <Button className="w-full" type="submit">
                Submit
              </Button>
              <div className="mt-4 text-center text-sm">
                Remember your password?{' '}
                <Link className="text-primary underline" href={PageRoutes.SIGNIN}>
                  Sign In
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  )
}

export default Page
