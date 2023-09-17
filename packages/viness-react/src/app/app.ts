import { createReactApp, VinessReactAppProps } from './app-react'
import { MODULE_METADATA } from './module'
import { IVinessModule } from './module/module'
import { createRoot } from 'react-dom/client'

export interface IVInessApp {}

/**
 * ```
 *  const app = createApp()
 *  app.render()
 * ```
 */
export class VinessApp {
    constructor(private appModule: IVinessModule) {}

    render(selector: string, props: Omit<VinessReactAppProps, 'app'>) {
        const app = createReactApp({ ...props, app: this })
        const container = document.getElementById(selector)
        container && createRoot(container).render(app)
    }
}

export class AppFactory {
    static create(appModule: any) {
        const module = appModule[MODULE_METADATA]

        return new VinessApp(module)
    }
}
