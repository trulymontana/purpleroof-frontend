"use client"

import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { LocalStorageKeys } from "@/constants/local-storage-keys"
import { User } from "@/constants/types"
import InputElement from "@/components/forms/elements/input-element"
import Link from "next/link"
import { PageRoutes } from "@/constants/page-routes"

const Page = () => {

    const storedValue = localStorage.getItem(LocalStorageKeys.USER)

    const user: User = storedValue !== null && JSON.parse(storedValue)

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
                            <Button variant={"outline"}>
                                Apply as Agent
                            </Button>
                            <Button variant="default" className="hover:bg-primary">Submit</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Page