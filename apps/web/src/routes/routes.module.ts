import { Module, RouterModule } from '@viness/react'
import { DashboardPage1Route, DashboardPage2Route, DashboardPage3Route, DashboardRoute, RootRoute } from './routes.protocol'

const routeTree: any = [RootRoute, [DashboardRoute, [DashboardPage1Route, DashboardPage2Route, DashboardPage3Route]]]

@Module({
    imports: [RouterModule.forRoot({ type: 'browser', routeTree })]
})
export class AppRouteModule {}
