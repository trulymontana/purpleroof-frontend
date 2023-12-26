'use client'

import { Package } from 'lucide-react'
import Link from 'next/link'

import SideNavBar from '@/components/navigation/side-nav-bar'
import { UserRoleEnum } from '@/constants/enums'
import { PageRoutes } from '@/constants/page-routes'
import { usePathname } from 'next/navigation'
import { CardHeader, CardContent, Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { User } from '@/constants/types'
import { LocalStorageKeys } from '@/constants/local-storage-keys'
import { useEffect, useState } from 'react'

const roleToPageMapping = {
  [UserRoleEnum.ADMIN]: [
    PageRoutes.admin.AGENTS,
    PageRoutes.admin.USERS,
    PageRoutes.admin.REQUIREMENTS,
    PageRoutes.dashboard.PROFILE
  ],
  [UserRoleEnum.ADVERTISER]: [
    PageRoutes.dashboard.MORTGAGES,
    PageRoutes.dashboard.PROPERTIES,
    PageRoutes.dashboard.PROFILE,
    PageRoutes.admin.REQUIREMENTS
  ],
  [UserRoleEnum.AGENT]: [PageRoutes.dashboard.PROPERTIES, PageRoutes.dashboard.PROFILE]
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname()

  const [userData, setUserData] = useState<User | undefined>()

  useEffect(() => {
    const storedValue = localStorage.getItem(LocalStorageKeys.USER)
    const user: User = storedValue !== null && JSON.parse(storedValue)
    setUserData(user)
  }, [])

  if (!userData) {
    return (
      <main className="flex h-screen flex-col items-center justify-center space-y-10 bg-gray-100">
        <div className="w-[300px]">
          <Card>
            <CardHeader>
              <h2 className="text-center text-2xl font-bold">Welcome!</h2>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-600">You&apos;re not currently signed in</p>
              <Button className="mt-4 block w-full text-center" variant="link">
                <Link className="text-primary hover:underline" href="/signin">
                  Sign In
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">New User?</Badge>
          <Button className="border-black text-primary hover:bg-primary hover:text-white" variant="outline">
            <Link href={PageRoutes.SIGNUP}>Sign Up</Link>
          </Button>
        </div>
      </main>
    )
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
    <div className="grid  min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
      <SideNavBar user={userData} />
      <div className="flex flex-col">{children}</div>
    </div>
  )
}
