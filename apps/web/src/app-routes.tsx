import { app } from './app'
import LandingPage from './features/auth/pages/landing'
import { DashboardLayout } from './features/dashboard/dashboard'
import { DashboardPage1 } from './features/dashboard/pages/dashboard-page1'
import { DashboardPage2 } from './features/dashboard/pages/dashboard-page2'

// routes
export const LandingPageRouteId = app.router.bind({ path: '/', element: <LandingPage /> })
export const DashboardRouteId = app.router.bind({ path: '/dashboard', element: <DashboardLayout /> })
export const DashboardPage1RouteId = app.router.bind({ path: 'page1', Component: DashboardPage1 }, DashboardRouteId)
export const DashboardPage2RouteId = app.router.bind({ path: 'page2', Component: DashboardPage2 }, DashboardRouteId)
