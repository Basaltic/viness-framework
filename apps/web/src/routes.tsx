import { app } from './app'
import { RouteItem } from '@viness/react'
import { LandingPage } from './features/auth/pages/landing'
import { DashboardLayout } from './features/dashboard/dashboard'
import { DashboardPage1 } from './features/dashboard/pages/page1'
import { DashboardPage2 } from './features/dashboard/pages/page2'
import { DashboardPage3 } from './features/dashboard/pages/page3'

// define routes
export const LandingPageRouteId = app.router.register({ path: '/', Component: LandingPage })

export const DashboardRouteId = app.router.register({ path: '/dashboard', Component: DashboardLayout })
export const DashboardPage1RouteId = app.router.register({ path: '', Component: DashboardPage1 })
export const DashboardPage2RouteId = app.router.register({ path: 'page2', Component: DashboardPage2 })
export const DashboardPage3Route = app.router.register({ path: 'page3', Component: DashboardPage3 })

// define route structures
export const routes: RouteItem[] = [
    LandingPageRouteId,
    {
        id: DashboardRouteId,
        children: [{ id: DashboardPage1RouteId, index: true }, DashboardPage2RouteId, DashboardPage3Route]
    }
]
