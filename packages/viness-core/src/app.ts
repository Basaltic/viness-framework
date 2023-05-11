import { SyncDescriptor } from '@viness/di'
import { IVinessAppConfig, VinessAppConfig } from './app-config'
import {
    servicesContainer,
    IServiceContainer,
    IStoreContainer,
    ServiceContainer,
    StoreContainer
} from './app-container'
import { initI18n } from './i18n'
import { IVinessRouter, VinessReactRouter } from './router'

/**
 * Manage all the instances
 */
export class VinessApp {
    get config() {
        return servicesContainer.get(IVinessAppConfig)
    }
    /**
     * router instance of the application
     */
    get router() {
        return servicesContainer.get(IVinessRouter)
    }

    get stores() {
        return servicesContainer.get(IStoreContainer)
    }

    get services() {
        return servicesContainer.get(IServiceContainer)
    }
}

export function createVinessApp(config?: IVinessAppConfig) {
    // register the builtin features
    servicesContainer.register(IStoreContainer, StoreContainer)
    servicesContainer.register(IServiceContainer, ServiceContainer)
    servicesContainer.register(IVinessRouter, VinessReactRouter)
    servicesContainer.register(IVinessAppConfig, new SyncDescriptor(VinessAppConfig, [config], true))

    // initialize features
    if (config?.i18n?.resources) {
        initI18n(config?.i18n)
    }

    // initialize the app
    const app = new VinessApp()
    return app
}
