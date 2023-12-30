import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar'
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenu
} from '@/components/ui/dropdown-menu'
import { LocalStorageKeys } from '@/constants/local-storage-keys'
import { PageRoutes } from '@/constants/page-routes'
import { User } from '@/constants/types'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const UserButton = ({ user }: { user: User }) => {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem(LocalStorageKeys.USER)
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-9 w-9 cursor-pointer">
          <AvatarImage alt="Profile avatar" src="/placeholder-avatar.jpg" />
          <AvatarFallback>{user?.firstName?.charAt(0) + user?.lastName?.charAt(0)}</AvatarFallback>
          <span className="sr-only">Toggle user menu</span>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="mb-2 bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-800">Hello, {user?.firstName}</div>
        <Link href={PageRoutes.dashboard.PROFILE}>
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton
