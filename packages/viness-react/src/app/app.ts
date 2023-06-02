import { Container, ServiceRegistry } from '@viness/di'
import { renderApp, VinessReactAppProps } from './app-react'
import { VinessModule } from './module'

export interface IVInessApp {}

export class VinessApp {
    private appModule: VinessModule
    private container: Container
    constructor(appModule: VinessModule) {
        this.appModule = appModule
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

    render(props: Omit<VinessReactAppProps, 'app'>) {
        return renderApp({ ...props, app: this })
    }
}

export function createApp(appModule: VinessModule) {
    return new VinessApp(appModule)
}
