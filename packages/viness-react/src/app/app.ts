import { createReactApp, VinessReactAppProps } from './app-react'
import { MODULE_METADATA_ID, registerModule, VinessModule } from './module'
import { createRoot } from 'react-dom/client'

export interface IVInessApp {}

/**
 * ```
 *  const app = createApp()
 *  app.render()
 * ```
 */
export class VinessApp {
    constructor(private appModule: VinessModule) {
        const startTime = new Date().valueOf()

        this.initialize()

        const endTime = new Date().valueOf()

        console.log('initialization spend: ', endTime - startTime)
    }

    private initialize() {
        registerModule(this.appModule)
    }

    render(selector: string, props: Omit<VinessReactAppProps, 'app'>) {
        const app = createReactApp({ ...props, app: this })
        const container = document.getElementById(selector)
        container && createRoot(container).render(app)
    }
}

export class AppFactory {
    static create(appModule: any) {
        const module: VinessModule = appModule[MODULE_METADATA_ID] || appModule

        return new VinessApp(module)
    }
}
