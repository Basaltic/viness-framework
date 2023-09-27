import { createRoute } from '@viness/react'
import { DashboardLayout } from '../features/dashboard/dashboard'
import { DashboardPage1 } from '../features/dashboard/pages/page1'
import { DashboardPage2 } from '../features/dashboard/pages/page2'
import { DashboardPage3 } from '../features/dashboard/pages/page3'

export const RootRoute = createRoute('/')

export const DashboardRoute = createRoute('/dashboard', { Component: DashboardLayout })

export const DashboardPage1Route = createRoute('/dashboard/page1', { Component: DashboardPage1 })

export const DashboardPage2Route = createRoute('/dashboard/page2', { Component: DashboardPage2 })

export const DashboardPage3Route = createRoute('/dashboard/page3', { Component: DashboardPage3 })
