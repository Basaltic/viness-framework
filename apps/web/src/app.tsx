import { createVinessApp } from '@viness/core'
import LandingPage from './features/auth/pages/landing'
import { DashboardLayout } from './features/dashboard/dashboard'

export const app = createVinessApp({ router: { routerType: 'browser' } })

export const LandingPageRouteId = app.router.addRoute({ path: '/', element: <LandingPage /> })

export const DashboardRouteId = app.router.addRoute({ path: '/dashboard', element: <DashboardLayout /> })
export const DashboardChildTestRouteId = app.router.addChildRoute(DashboardRouteId, {
    path: 'test',
    element: <div>test</div>
})
