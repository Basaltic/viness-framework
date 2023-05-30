import { registerRoute, RouteItem } from '@viness/react'
import { LandingPage } from './features/auth/pages/landing'
import { DashboardLayout } from './features/dashboard/dashboard'
import { DashboardPage1 } from './features/dashboard/pages/page1'
import { DashboardPage2 } from './features/dashboard/pages/page2'
import { DashboardPage3 } from './features/dashboard/pages/page3'

// define routes
export const LandingPageRouteId = registerRoute({ path: '/', Component: LandingPage })

export const DashboardRouteId = registerRoute({ path: '/dashboard', Component: DashboardLayout })
export const DashboardPage1RouteId = registerRoute({ path: '', Component: DashboardPage1 })
export const DashboardPage2RouteId = registerRoute({ path: 'page2', Component: DashboardPage2 })
export const DashboardPage3Route = registerRoute({ path: 'page3', Component: DashboardPage3 })

// define route structures
export const routes: RouteItem[] = [
    LandingPageRouteId,
    {
        id: DashboardRouteId,
        children: [{ id: DashboardPage1RouteId, index: true }, DashboardPage2RouteId, DashboardPage3Route]
    }
]
