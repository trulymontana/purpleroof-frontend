'use client'

import DashboardLayout from '@/components/DashboardLayout'
import AgentsTable from '@/components/tables/agents-table'
import React from 'react'

const Agents = () => {
  return (
    <DashboardLayout heading='Agents'><AgentsTable /></DashboardLayout>
  )
}

export default Agents
