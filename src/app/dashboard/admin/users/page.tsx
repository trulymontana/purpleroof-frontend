import DashboardLayout from '@/components/DashboardLayout'
import UsersTable from '@/components/tables/users-table'

const Users = () => {
  return (
    <DashboardLayout heading='Users'><UsersTable /></DashboardLayout>
  )
}

export default Users
