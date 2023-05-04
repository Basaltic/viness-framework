import { SyncDescriptor } from '@viness/di'
import { IVinessAppConfig, VinessAppConfig } from './app-config'
import { container, IServiceContainer, IStoreContainer, ServiceContainer, StoreContainer } from './container'
import { initI18n } from './i18n'
import { IVinessRouter, VinessReactRouter } from './router'

/**
 * Manage all the instances
 */
export class VinessApp {
    get config() {
        return container.get(IVinessAppConfig)
    }
    /**
     * router instance of the application
     */
    get router() {
        return container.get(IVinessRouter)
    }

    get stores() {
        return container.get(IStoreContainer)
    }

    get services() {
        return container.get(IServiceContainer)
    }
}

export function createVinessApp(config?: IVinessAppConfig) {
    // register the builtin features
    container.register(IStoreContainer, StoreContainer)
    container.register(IServiceContainer, ServiceContainer)
    container.register(IVinessRouter, VinessReactRouter)
    container.register(IVinessAppConfig, new SyncDescriptor(VinessAppConfig, [config], true))

    // initialize features
    if (config?.i18n?.resources) {
        initI18n(config?.i18n)
    }

    // initialize the app
    const app = new VinessApp()
    return app
}
