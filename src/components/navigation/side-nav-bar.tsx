'use client'

import { PageRoutes } from '@/constants/page-routes'
import { User } from '@/constants/types'
import { Building, FileCode, Files, Home, PersonStandingIcon, Settings, User as UserIcon } from 'lucide-react'
import Link from 'next/link'
import UserButton from './user-button'

const ICON_SIZE = 20

const navigationSidebarItems = [
  {
    title: 'Mortgages',
    link: PageRoutes.dashboard.MORTGAGES,
    icon: <FileCode size={ICON_SIZE} />
  },
  {
    title: 'Properties',
    link: PageRoutes.dashboard.PROPERTIES,
    icon: <Building size={ICON_SIZE} />
  },
  {
    title: 'Agents',
    link: PageRoutes.dashboard.admin.AGENTS,
    icon: <PersonStandingIcon size={ICON_SIZE} />
  },
  {
    title: 'Users',
    link: PageRoutes.dashboard.admin.USERS,
    icon: <UserIcon size={ICON_SIZE} />
  },
  {
    title: 'Requirements',
    link: PageRoutes.dashboard.admin.REQUIREMENTS,
    icon: <Files size={ICON_SIZE} />
  },
  {
    title: 'Profile',
    link: PageRoutes.dashboard.PROFILE,
    icon: <Settings size={ICON_SIZE} />
  },
]

interface SidebarNavigationLinkProps {
  title: string
  link: string
  icon?: React.ReactNode
}
const SidebarNavigationLink = ({ link, title, icon }: SidebarNavigationLinkProps) => (
  <Link
    className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
    href={link}
  >
    <span className="w-8">{icon}</span>
    {title}
  </Link>
)

export default function SideNavBar({ user }: { user: User }) {
  return (
    <div className="hidden border-r bg-gray-100/40 dark:bg-gray-800/40 lg:block">
      <div className='flex flex-col gap-2 justify-between h-full'>
        <div className="flex h-[60px] items-center px-6">
          <div className="flex items-center justify-between w-full gap-2 font-semibold" >
            <Link href="#" className='flex items-center w-full gap-2 font-semibold'>
              <Home />
              <span>PurpleRoof</span>
            </Link>
            <UserButton user={user} />
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          <nav className="grid items-start px-4 text-sm font-medium">
            {navigationSidebarItems.map((item) => (
              <SidebarNavigationLink key={item.title} link={item.link} title={item.title} icon={item.icon} />
            ))}
          </nav>
        </div>
      </div>
    </div >
  )
}
