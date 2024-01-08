'use client'

import { PageRoutes } from '@/constants/page-routes'
import { User } from '@/constants/types'
import { Building, FileCode, Files, Home, Menu, PersonStandingIcon, Settings, User as UserIcon } from 'lucide-react'
import Link from 'next/link'
import UserButton from './user-button'
import { UserRoleEnum } from '@/constants/enums'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import { usePathname } from 'next/navigation'

const ICON_SIZE = 20

const navigationItems = [
  {
    title: 'Mortgages',
    link: PageRoutes.dashboard.MORTGAGES,
    icon: <FileCode size={ICON_SIZE} />,
    roles: [UserRoleEnum.ADMIN, UserRoleEnum.GENERAL_USER, UserRoleEnum.SUPER_ADMIN, UserRoleEnum.AGENT]
  },
  {
    title: 'Properties',
    link: PageRoutes.dashboard.PROPERTIES,
    icon: <Building size={ICON_SIZE} />,
    roles: [UserRoleEnum.ADMIN, UserRoleEnum.GENERAL_USER, UserRoleEnum.SUPER_ADMIN, UserRoleEnum.AGENT]
  },
  {
    title: 'Agents',
    link: PageRoutes.dashboard.admin.AGENTS,
    icon: <PersonStandingIcon size={ICON_SIZE} />,
    roles: [UserRoleEnum.ADMIN, UserRoleEnum.SUPER_ADMIN]
  },
  {
    title: 'Users',
    link: PageRoutes.dashboard.admin.USERS,
    icon: <UserIcon size={ICON_SIZE} />,
    roles: [UserRoleEnum.SUPER_ADMIN]
  },
  {
    title: 'Requirements',
    link: PageRoutes.dashboard.admin.REQUIREMENTS,
    icon: <Files size={ICON_SIZE} />,
    roles: [UserRoleEnum.SUPER_ADMIN]
  },
  {
    title: 'Profile',
    link: PageRoutes.dashboard.PROFILE,
    icon: <Settings size={ICON_SIZE} />,
    roles: [UserRoleEnum.ADMIN, UserRoleEnum.GENERAL_USER, UserRoleEnum.SUPER_ADMIN, UserRoleEnum.AGENT]
  }
]

interface NavigationLinkProps {
  title: string
  link: string
  icon?: React.ReactNode
}
const NavigationLink = ({ link, title, icon }: NavigationLinkProps) => {
  const pathName = usePathname();
  return (
    <Link
      className={`flex items-center rounded-lg py-2 ${link === pathName ? "text-primary" : "text-gray-900"} transition-all hover:text-primary dark:bg-gray-800 dark:text-gray-50 gap-2 dark:hover:text-gray-50 text-base`}
      href={link}
    >
      <span className={"w-5"}>{icon}</span>
      {title}
    </Link >
  )
}

export default function NavBar({ user }: { user: User }) {
  return (
    <div className="w-full items-center justify-between gap-2 py-4 px-5 xl:px-16 bg-gray-300/40 dark:bg-gray-800/40 flex">
      <div className="flex w-full items-center justify-between gap-2 font-semibold ">
        <Link href="#" className="flex items-center gap-2 font-semibold text-primary">
          <Home />
          <span>PurpleRoof</span>
        </Link>
        <nav className="hidden xl:flex items-center gap-10 text-sm font-medium text-primary">
          {navigationItems
            .filter((item) => item.roles.includes(user.role))
            .map((item) => (
              <NavigationLink key={item.title} link={item.link} title={item.title} icon={item.icon} />
            ))}
        </nav>
        <UserButton user={user} />
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Menu className="xl:hidden" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className='text-primary text-start'>Purpleroof Inc.</SheetTitle>
          </SheetHeader>
          <div className="mt-10 grid gap-5">
            {navigationItems
              .filter((item) => item.roles.includes(user.role))
              .map((item) => (
                <NavigationLink key={item.title} link={item.link} title={item.title} icon={item.icon} />
              ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
