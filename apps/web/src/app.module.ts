import { createModule, initI18n } from '@viness/react'
import { dashboardModule } from './features/dashboard/dashboard.module'

import enCommon from './i18n/en/common.json'
import zhCommon from './i18n/zh/common.json'
import { routerModule } from './router.module'

export const appModule = createModule({
    imports: [routerModule, dashboardModule]
})

initI18n({
    resources: {
        zh: {
            common: zhCommon
        },
        en: {
            common: enCommon
        }
    }
})
