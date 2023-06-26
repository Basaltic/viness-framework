import { Container, ServiceRegistry } from '@viness/di'
import { renderApp, VinessReactAppProps } from './app-react'
import { VinessModule } from './module'
import { createRoot } from 'react-dom/client'

export interface IVInessApp {}

export class VinessApp {
    container: Container
    constructor(appModule: VinessModule) {
        this.container = this.initializeContainer(appModule)
    }

    private initializeContainer(appModule: VinessModule) {
        const mergeRegistry = (appModule: VinessModule, mainRegistry: ServiceRegistry) => {
            const moduelRegistry = appModule.registry
            mainRegistry.merge(moduelRegistry)

            if (appModule.subModules && appModule.subModules.length > 0) {
                appModule.subModules.forEach((module) => mergeRegistry(module, mainRegistry))
            }
        }

        const mainRegistry = new ServiceRegistry()
        mergeRegistry(appModule, mainRegistry)

        const container = new Container(mainRegistry)
        return container
    }

    render(selector: string, props: Omit<VinessReactAppProps, 'app'>) {
        const app = renderApp({ ...props, app: this })
        const container = document.getElementById(selector)
        container && createRoot(container).render(app)
    }
}

export function createApp(appModule: VinessModule) {
    return new VinessApp(appModule)
}
