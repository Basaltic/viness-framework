import { createRoute, useResolve } from '@viness/react'
import { DashboardLayout } from '../features/dashboard/dashboard'
import { DashboardPage1 } from '../features/dashboard/pages/page1'
import { DashboardPage2 } from '../features/dashboard/pages/page2'
import { DashboardPage3 } from '../features/dashboard/pages/page3'

export const RootRoute = createRoute('/')

export const DashboardRoute = createRoute('/d', { Component: DashboardLayout })

export const DashboardPage1Route = createRoute('', { Component: DashboardPage1 })

export const DashboardPage2Route = createRoute('p2', { Component: DashboardPage2 })
export const useDashboardPage2Route = () => useResolve(DashboardPage2Route)

export const DashboardPage3Route = createRoute('p3', { Component: DashboardPage3 })
export const useDashboardPage3Route = () => useResolve(DashboardPage3Route)

export const ProjectRoute = createRoute('/p', { Component: DashboardLayout })

export const ProjectPage1Route = createRoute('', { Component: DashboardPage1 })

export const ProjectPage2Route = createRoute('', { Component: DashboardPage2 })

export const ProjectPage3Route = createRoute('p3', { Component: DashboardPage3 })
