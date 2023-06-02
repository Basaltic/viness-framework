import { createRouterModule } from '@viness/react'
import { LandingPage } from './features/auth/pages/landing'
import { DashboardLayout } from './features/dashboard/dashboard'
import { DashboardPage1 } from './features/dashboard/pages/page1'
import { DashboardPage2 } from './features/dashboard/pages/page2'
import { DashboardPage3 } from './features/dashboard/pages/page3'

const routes = [
    { path: '/', Component: LandingPage },
    {
        path: '/dashboard',
        Component: DashboardLayout,
        children: [
            { path: '', index: true, Component: DashboardPage1 },
            { path: 'page2', Component: DashboardPage2 },
            { path: 'page3', Component: DashboardPage3 }
        ]
    }
]

export const routerModule = createRouterModule({ type: 'browser', routes: routes })
