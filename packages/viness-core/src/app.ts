import { Container, ServiceIdentifier } from '@viness/di'
import { initI18n, InitOptions } from './i18n'
import { createRoute, VinessRoute, VinessRouteObject } from './route'
import { IVinessRouter, VinessRouter } from './router'

export interface VinessAppConfig {
    i18nConfig?: InitOptions
}

/**
 *
 */
export class VinessApp {
    readonly container: Container

    private config?: VinessAppConfig

    constructor(container: Container, config?: VinessAppConfig) {
        if (config?.i18nConfig) {
            initI18n(config?.i18nConfig)
        }

        this.config = config
        this.container = container
    }

    getRoute(parentRouteId: ServiceIdentifier<VinessRoute>) {
        return this.container.get(parentRouteId)
    }

    addRoute(routeObj: VinessRouteObject) {
        const vinessRouter = this.container.get(IVinessRouter)

        const [id, Route] = createRoute(routeObj)
        this.container.register(id, Route)
        const route = this.container.get(id)

        vinessRouter.addRoute(id, route)
        return id
    }

    addChildRoute(parentRouteId: ServiceIdentifier<VinessRoute>, childRouteObj: VinessRouteObject) {
        const parentRoute = this.container.get(parentRouteId)

        const [id, Route] = createRoute(childRouteObj)
        this.container.register(id, Route)
        const childRoute = this.container.get(id)

        parentRoute.addChildren(childRoute)
        return id
    }
}

export function createVinessApp(config?: VinessAppConfig) {
    // Initialize the container
    const container = new Container()

    // Register the builtin features
    container.register(IVinessRouter, VinessRouter)

    // Initialize the app
    const app = new VinessApp(container, config)
    return app
}
