"use client"

import { Package } from 'lucide-react'
import Link from 'next/link'

import SideNavBar from '@/components/navigation/side-nav-bar'
import { UserRoleEnum } from '@/constants/enums'
import { PageRoutes } from '@/constants/page-routes'
import { usePathname } from 'next/navigation'
import { CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const roleToPageMapping = {
  [UserRoleEnum.ADMIN]: [PageRoutes.admin.AGENTS, PageRoutes.admin.USERS, PageRoutes.admin.REQUIREMENTS],
  [UserRoleEnum.ADVERTISER]: [PageRoutes.dashboard.MORTGAGES, PageRoutes.dashboard.PROPERTIES]
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {

  const pathName = usePathname();
  // @ts-ignore
  const user: any = JSON.parse(localStorage.getItem("user"))

  if (!user) {
    return (
      <main className='flex flex-col items-center justify-center h-screen bg-gray-100 space-y-10'>
        <div className="w-[300px]">
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-bold text-center">Welcome!</h2>
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
          <Button className="text-primary border-black hover:bg-primary hover:text-white" variant="outline">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </main>
    )
  }
  // @ts-ignore
  const allowedPages = roleToPageMapping[user.role];

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
