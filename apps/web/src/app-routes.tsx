import { app } from './app'
import LandingPage from './features/auth/pages/landing'
import { DashboardLayout } from './features/dashboard/dashboard'
import { DashboardPage1 } from './features/dashboard/pages/page1'
import { DashboardPage2 } from './features/dashboard/pages/page2'
import { DashboardPage3 } from './features/dashboard/pages/page3'

// routes
export const LandingPageRouteId = app.routes.add({ path: '/', element: <LandingPage /> })

export const DashboardRouteId = app.routes.add({ path: '/dashboard', element: <DashboardLayout /> })
export const DashboardPage1RouteId = DashboardRouteId.addChild({
    path: 'page1',
    index: true,
    Component: DashboardPage1
})
export const DashboardPage2RouteId = DashboardRouteId.addChild({ path: 'page2', Component: DashboardPage2 })
export const DashboardPage3Route = DashboardRouteId.addChild({ path: 'page3', Component: DashboardPage3 })
