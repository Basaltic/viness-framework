import { ServiceIdentifier, Container } from '@viness/di'
import { VinessRoute, VinessRouteObject, createRoute } from './route'
import { IVinessRouter } from './router'

export class RouterManager {
    readonly container: Container

    constructor(container: Container) {
        this.container = container
    }

    getRoute(parentRouteId: ServiceIdentifier<VinessRoute>) {
        return this.container.get(parentRouteId)
    }

    /**
     * add new route
     *
     * @param routeObj added route
     * @param parentRouteId parent route of this added route
     * @returns
     */
    addRoute(routeObj: VinessRouteObject, parentRouteId?: ServiceIdentifier<VinessRoute>) {
        const vinessRouter = this.container.get(IVinessRouter)

        const [id, Route] = createRoute(routeObj)
        this.container.register(id, Route)

        vinessRouter.addRoute(id, parentRouteId)
        return id
    }
}
