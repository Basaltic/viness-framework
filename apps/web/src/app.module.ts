import { createModule } from '@viness/react'
import { routerModule } from './routes/routes.module'
import { dashboardModule } from './features/dashboard/dashboard.module'

export const appModule = createModule({
    imports: [routerModule, dashboardModule]
})
