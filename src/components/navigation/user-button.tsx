import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { User } from "@/constants/types"

const UserButton = ({ user }: { user: User }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9 cursor-pointer">
                    <AvatarImage alt="Profile avatar" src="/placeholder-avatar.jpg" />
                    <AvatarFallback>{user.firstName.charAt(0) + user.lastName.charAt(0)}</AvatarFallback>
                    <span className="sr-only">Toggle user menu</span>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <div className="mb-2 px-4 py-2 text-gray-800 text-sm font-semibold bg-gray-100">
                    Hello, {user.firstName}
                </div>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserButton