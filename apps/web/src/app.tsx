import { createVinessApp } from '@viness/core'
import LandingPage from './features/auth/pages/landing'
import { DashboardLayout } from './features/dashboard/dashboard'
import { DashboardPage1 } from './features/dashboard/pages/dashboard-page1'
import { DashboardPage2 } from './features/dashboard/pages/dashboard-page2'

export const app = createVinessApp({ router: { routerType: 'browser' } })

export const LandingPageRouteId = app.router.addRoute({ path: '/', element: <LandingPage /> })

export const DashboardRouteId = app.router.addRoute({ path: '/dashboard', element: <DashboardLayout /> })
export const DashboardPage1RouteId = app.router.addRoute({ path: 'page1', Component: DashboardPage1 }, DashboardRouteId)
export const DashboardPage2RouteId = app.router.addRoute({ path: 'page2', Component: DashboardPage2 }, DashboardRouteId)
