"use client"

import { useEffect, useRef, useState } from 'react'
import * as z from 'zod'
import { Card, CardContent } from '../ui/card'
import { MessageCircle, MessageCircleIcon, Send, X } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { useCreateCommentMutation, useGetCommentsByMortgage } from '@/data/hooks/useCommentsClient'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Form } from '../ui/form'
import FileUploader from '../forms/elements/file-uploader'
import TextAreaElement from '../forms/elements/text-area-element'
import { User } from '@/constants/types'
import { UserRoleEnum } from '@/constants/enums'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
    title: z.string({
        required_error: 'Please enter a message'
    }),
    attachment: z.string().optional()
})

interface Props {
    mortgageId: number;
    userDetails: User | {
        firstName: string,
        lastName: string,
        role: UserRoleEnum,
        email: string,
        id: number
    }
}
const ChatBox = ({ mortgageId, userDetails }: Props) => {

    const [chatOpen, setChatOpen] = useState(false)
    const { data: comments } = useGetCommentsByMortgage(Number(mortgageId))
    const { mutate: sendComment, isPending: isLoading } = useCreateCommentMutation()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        sendComment({
            mortgageId: Number(mortgageId),
            attachments: [values.attachment ?? ""],
            message: "",
            ...values
        })
    }

    return (
        <Popover open={chatOpen} onOpenChange={setChatOpen}>
            <PopoverTrigger asChild>
                <Button className="w-15 h-15 flex items-center justify-center rounded-full bg-primary">
                    <MessageCircle size={25} className="text-white" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="mt-2 w-[300px] md:w-[400px] rounded-lg bg-white">
                <Card className="border-none">
                    <CardContent>
                        <div className="fixed bottom-0 right-0 w-full md:w-[400px] overflow-hidden rounded-t-lg bg-white shadow-lg">
                            <div className="flex items-center justify-between bg-gray-100 p-3">
                                <div className="flex items-center space-x-2">
                                    <MessageCircleIcon size={20} />
                                    <h2 className="text-lg font-bold">Chat</h2>
                                </div>
                                <X onClick={() => setChatOpen(!chatOpen)} className="h-6 w-6 cursor-pointer" />
                            </div>
                            <div className="flex h-[200px] md:h-[400px] flex-col gap-4 overflow-y-scroll p-3">
                                {comments &&
                                    comments?.map((comment, i) => {
                                        return (
                                            <div className="flex flex-col gap-4" key={i}>
                                                {comment.userId === userDetails.id ? (
                                                    <div className="flex items-end">
                                                        <div className="h-10 w-10 flex-none">
                                                            <Avatar className="h-full w-full">
                                                                <AvatarImage alt="User" src="/placeholder-avatar.jpg" />
                                                                <AvatarFallback>{userDetails.firstName?.charAt(0) + userDetails.lastName.charAt(0)}</AvatarFallback>
                                                            </Avatar>
                                                        </div>
                                                        <div className="ml-2 flex-1">
                                                            <div className="rounded-r-lg bg-blue-100 p-3 text-black dark:bg-blue-900 dark:text-white">
                                                                {comment.title}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-end justify-end">
                                                        <div className="mr-2 flex-1">
                                                            <div className="rounded-l-lg bg-gray-200 p-3 text-black dark:bg-gray-800 dark:text-white">
                                                                {comment.title}
                                                            </div>
                                                        </div>
                                                        <div className="h-10 w-10 flex-none">
                                                            <Avatar className="h-full w-full">
                                                                <AvatarImage alt="Admin" src="/placeholder-avatar.jpg" />
                                                                <AvatarFallback>A</AvatarFallback>
                                                            </Avatar>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                            </div>
                            <div className="w-fit gap-2 border-t px-2 py-2">
                                <div className="flex w-full items-center space-x-2">
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                            <FileUploader form={form} folder="mortgage" name="attachment" label="Attachment" />
                                            <div className="flex w-full flex-col items-center gap-2">
                                                <TextAreaElement name="title" placeholder="Type here..." className="w-full" />
                                                <Button disabled={isLoading} type="submit" className="w-full h-full">
                                                    {isLoading ? (
                                                        'Sending...'
                                                    ) : (
                                                        <span className="flex items-center gap-2">
                                                            Send <Send className="h-5 w-5" />
                                                        </span>
                                                    )}
                                                </Button>
                                            </div>
                                        </form>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </PopoverContent>
        </Popover>
    )
}

export default ChatBox