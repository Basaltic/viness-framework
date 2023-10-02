import { createModule } from '@viness/react'
import { AppRouteModule } from './routes/routes.module'
import { DashboardModule } from './features/dashboard/dashboard.module'

export const appModule = createModule({
    imports: [AppRouteModule, DashboardModule]
})
