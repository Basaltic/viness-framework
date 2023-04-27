import { Container, createDecorator, IInstantiationService, ServiceIdentifier } from '@viness/di'
import { IVinessAppConfig, VinessAppConfig } from './app-config'
import { initI18n } from './i18n'
import { VinessRouteObject, VinessRoute } from './route'
import { IVinessRouter, VinessRouter } from './router'
import { generateId } from './utils'

const container = new Container()

export const IVinessApp = createDecorator<VinessApp>('IVinessApp')

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

    /**
     * add new service to app
     */
    addService<T, Services extends {}[]>(
        id: ServiceIdentifier<T>,
        service: new (...services: Services) => T,
        isLazyInit: boolean = true
    ) {
        const supportType = isLazyInit ? 1 : 0
        container.register(id, service, supportType)
    }

    /**
     * get service instance by id
     *
     * @param {ServiceIdentifier<T>} service identifier
     * @returns {T} service instance
     */
    getService<T>(id: ServiceIdentifier<T>) {
        return container.get(id)
    }

    /**
     * add new route
     *
     * @param routeObj added route
     * @param parentRouteId parent route of this added route
     * @returns
     */
    addRoute(routeObj: VinessRouteObject, parentRouteId?: ServiceIdentifier<VinessRoute>) {
        const vinessRouter = container.get(IVinessRouter)

        const id = `VinessRoute_${routeObj.id || generateId()}`
        const IRouteDecorator = createDecorator<VinessRoute>(id)

        class Route extends VinessRoute {
            constructor(@IInstantiationService instantiationService: IInstantiationService) {
                super(routeObj, IRouteDecorator, instantiationService)
            }
        }

        container.register(IRouteDecorator, Route)
        vinessRouter.addRoute(IRouteDecorator, parentRouteId)

        return IRouteDecorator
    }
}

export function createVinessApp(config?: IVinessAppConfig) {
    // Register the builtin features
    // - aop
    // - router
    // - aoo configuration
    container.register(IVinessApp, VinessApp)
    container.register(IVinessRouter, VinessRouter)
    container.register(IVinessAppConfig, VinessAppConfig)

    container.get(IVinessAppConfig).setConfig(config)

    // initialize features
    if (config?.i18n?.resources) {
        initI18n(config?.i18n)
    }

    // Initialize the app
    const app = container.get(IVinessApp)
    return app
}
