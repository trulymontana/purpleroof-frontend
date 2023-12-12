import SideNavBar from '@/components/navigation/side-nav-bar'
import { Package } from 'lucide-react'
import Link from 'next/link'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid  min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
      <SideNavBar />
      <div className="flex flex-col">{children}</div>
    </div>
  )
}
