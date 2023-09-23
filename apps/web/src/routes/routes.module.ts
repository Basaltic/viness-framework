import { Module, RouterModule } from '@viness/react'

import { dashboardRoute, rootRoute } from './routes'

@Module({
    imports: [RouterModule.forRoot({ type: 'browser', routes: [rootRoute, dashboardRoute] })]
})
export class ExampleRouterModule {}
