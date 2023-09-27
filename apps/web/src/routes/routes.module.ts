import { createRouterModule } from '@viness/react'
import { DashboardPage1Route, DashboardPage2Route, DashboardPage3Route, DashboardRoute, RootRoute } from './routes.protocol'

export const routerModule = createRouterModule({
    type: 'browser',
    routeTree: [RootRoute, [DashboardRoute, [DashboardPage1Route, DashboardPage2Route, DashboardPage3Route]]]
})
