"use client"

import { Package } from 'lucide-react'
import Link from 'next/link'

import SideNavBar from '@/components/navigation/side-nav-bar'
import { UserRoleEnum } from '@/constants/enums'
import { PageRoutes } from '@/constants/page-routes'
import { usePathname } from 'next/navigation'

const roleToPageMapping = {
  [UserRoleEnum.ADMIN]: [PageRoutes.admin.AGENTS, PageRoutes.admin.USERS, PageRoutes.admin.REQUIREMENTS],
  [UserRoleEnum.ADVERTISER]: [PageRoutes.dashboard.MORTGAGES, PageRoutes.dashboard.PROPERTIES]
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {

  const pathName = usePathname();
  // @ts-ignore
  const user: any = JSON.parse(localStorage.getItem("user"))
  // @ts-ignore
  const allowedPages = roleToPageMapping[user.role];

  console.log({ user })

  if (!allowedPages?.includes(pathName)) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <Package size={200} />
        <h1 className="text-3xl font-bold">You are not allowed to access this page</h1>
        <Link className='text-primary underline' href={'/'}>
          Go to home page
        </Link>
      </div>
    )
  }

  return (
    <div className="grid  min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
      <SideNavBar />
      <div className="flex flex-col">{children}</div>
    </div>
  )
}
