'use client'

import { Package } from 'lucide-react'
import Link from 'next/link'

import { UserRoleEnum } from '@/constants/enums'
import { PageRoutes } from '@/constants/page-routes'
import { usePathname, useRouter } from 'next/navigation'
import { User } from '@/constants/types'
import { LocalStorageKeys } from '@/constants/local-storage-keys'
import { useEffect, useState } from 'react'
import Loader from '@/components/Loader'
import NavBar from '@/components/navigation/dashboard-nav-bar'

const roleToPageMapping = {
  [UserRoleEnum.SUPER_ADMIN]: [
    PageRoutes.admin.AGENTS,
    PageRoutes.admin.USERS,
    PageRoutes.admin.REQUIREMENTS,
    PageRoutes.dashboard.PROFILE,
    PageRoutes.dashboard.MORTGAGES,
    PageRoutes.dashboard.PROPERTIES
  ],
  [UserRoleEnum.ADMIN]: [
    PageRoutes.admin.AGENTS,
    PageRoutes.admin.USERS,
    PageRoutes.admin.REQUIREMENTS,
    PageRoutes.dashboard.PROFILE,
    PageRoutes.dashboard.MORTGAGES,
    PageRoutes.dashboard.PROPERTIES
  ],
  [UserRoleEnum.GENERAL_USER]: [
    PageRoutes.dashboard.MORTGAGES,
    PageRoutes.dashboard.PROPERTIES,
    PageRoutes.dashboard.PROFILE,
    PageRoutes.admin.REQUIREMENTS
  ],
  [UserRoleEnum.AGENT]: [PageRoutes.dashboard.MORTGAGES, PageRoutes.dashboard.PROPERTIES, PageRoutes.dashboard.PROFILE]
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname()

  const [userData, setUserData] = useState<User | undefined>()
  const [isLoaded, setIsLoaded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const storedValue = localStorage.getItem(LocalStorageKeys.USER)
    const user: User = storedValue !== null && JSON.parse(storedValue)
    setUserData(user)
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return <Loader />
  }

  if (!userData) {
    router.push(PageRoutes.SIGNIN)
    return null
  }

  const allowedPages = roleToPageMapping[userData.role]

  if (!allowedPages?.some((page: string) => pathName.includes(page))) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <Package size={200} />
        <h1 className="text-3xl font-bold">You are not allowed to access this page</h1>
        <Link className="text-primary underline" href={'/'}>
          Go to home page
        </Link>
      </div>
    )
  }

  return (
    <div className="flex h-auto min-h-screen flex-col">
      <NavBar user={userData} />
      <div className="flex flex-col">{children}</div>
    </div>
  )
}
