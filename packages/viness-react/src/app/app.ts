import { renderApp, VinessReactAppProps } from './app-react'
import { IVinessModule } from './module'
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
        const app = renderApp({ ...props, app: this })
        const container = document.getElementById(selector)
        container && createRoot(container).render(app)
    }
}

export function createApp(appModule: IVinessModule) {
    return new VinessApp(appModule)
}
