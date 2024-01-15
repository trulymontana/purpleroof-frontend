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
import { useForgotPassword } from '@/data/hooks/useAuthClient'
import { useSearchParams } from 'next/navigation'

const formSchema = z
  .object({
    email: z.string({
      required_error: 'Please enter your email!'
    })
  })


const Page = () => {

  const searchParams = useSearchParams();
  const { isPending: isLoading, mutate: forgotPassword } = useForgotPassword()

  const email = searchParams.get('email')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email || ''
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    forgotPassword({
      ...values
    })
  }

  return (
    <main className="auth_section">
      <Card className="auth_card">
        <CardHeader>
          <h1 className="auth_head">Forgot Password</h1>
          <p className='text-sm text-center text-gray-400'>Enter the email address associated with your account. We&apos;ll send a link to your email to reset your password!</p>
        </CardHeader>
        <CardContent className="">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 px-4">
              <div className="space-y-2">
                <CustomInputElement name="email" label="Email" type="email" />
              </div>
              <Button disabled={isLoading} className="w-full" type="submit">
                {isLoading ? "Sending..." : "Send Email"}
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
