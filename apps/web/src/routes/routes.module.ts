import { Module, RouterModule } from '@viness/react'
import { dashboardModule } from '../features/dashboard/dashboard.module'

import { dashboardRoute, rootRoute } from './routes'

@Module({
    imports: [RouterModule.forRoot({ type: 'browser', routes: [rootRoute, dashboardRoute] }), dashboardModule]
})
export class ExampleRouterModule {}
