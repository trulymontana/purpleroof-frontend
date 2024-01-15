'use client'

import { CardHeader, CardContent, Card, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { PageRoutes } from '@/constants/page-routes'
import CustomInputElement from '@/components/forms/elements/custom-input-element'
import * as z from 'zod'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useResetPassword } from '@/data/hooks/useAuthClient'

const formSchema = z
    .object({
        newPassword: z.string({
            required_error: 'Please enter your new password!'
        }),
        confirmNewPassword: z.string({
            required_error: 'Please re-enter your password'
        })
    })
    .refine(
        (values) => {
            return values.newPassword === values.confirmNewPassword
        },
        {
            message: 'Passwords must match!',
            path: ['confirmNewPassword']
        }
    )

interface Props {
    params: { resetToken: string }
}

const Page = ({ params }: Props) => {

    const { isPending: isLoading, mutate: resetPassword } = useResetPassword()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const data = { ...values, resetPasswordToken: params.resetToken }
        resetPassword({
            ...data
        })
    }

    return (
        <main className="auth_section">
            <Card className="auth_card">
                <CardHeader>
                    <h1 className="auth_head">Reset Password</h1>
                    <p className="auth_subhead">Reset your password!</p>
                </CardHeader>
                <CardContent className="">
                    <CardTitle></CardTitle>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 px-4">
                            <div className="space-y-2">
                                <CustomInputElement name="newPassword" label="New Password" type="password" />
                            </div>
                            <div className="space-y-2">
                                <CustomInputElement name="confirmNewPassword" label="Confirm Password" type="password" />
                            </div>
                            <Button disabled={isLoading} className="w-full" type="submit">
                                {isLoading ? "Saving..." : "Save Changes"}
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
