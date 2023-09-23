import { Module } from '@viness/react'
import { ExampleRouterModule } from './routes/routes.module'
import { DashboardModule } from './features/dashboard/dashboard.module'

@Module({
    imports: [ExampleRouterModule, DashboardModule]
})
export class AppModule {}
