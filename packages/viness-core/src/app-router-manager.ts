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

    addRoute(routeObj: VinessRouteObject) {
        const vinessRouter = this.container.get(IVinessRouter)

        const [id, Route] = createRoute(routeObj)
        this.container.register(id, Route)

        vinessRouter.addRoute(id)
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
