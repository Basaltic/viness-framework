import { Container, ServiceIdentifier } from '@viness/di'
import { IVinessAppConfig, VinessAppConfig } from './app-config'
import { RouterManager } from './app-router-manager'
import { initI18n } from './i18n'
import { IVinessRouter, VinessRouter } from './router'

/**
 *
 */
export class VinessApp {
    readonly container: Container

    readonly router: RouterManager

    constructor(container: Container, config?: IVinessAppConfig) {
        if (config?.i18n) {
            initI18n(config?.i18n)
        }

        this.container = container
        this.router = new RouterManager(container)
    }

    /**
     * add new service to app
     */
    addService<T, Services extends {}[]>(
        id: ServiceIdentifier<T>,
        service: new (...services: Services) => T,
        isLazyInit: boolean = true
    ) {
        const supportType = isLazyInit ? 1 : 0
        this.container.register(id, service, supportType)
    }

    /**
     * get service instance by id
     *
     * @param {ServiceIdentifier<T>} service identifier
     * @returns {T} service instance
     */
    getService<T>(id: ServiceIdentifier<T>) {
        return this.container.get(id)
    }
}

export function createVinessApp(config?: IVinessAppConfig) {
    // Initialize the container
    const container = new Container()

    // Register the builtin features
    container.register(IVinessRouter, VinessRouter)
    container.register(IVinessAppConfig, VinessAppConfig)

    container.get(IVinessAppConfig).setConfig(config)

    // Initialize the app
    const app = new VinessApp(container, config)
    return app
}
