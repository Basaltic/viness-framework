import { ServiceIdentifier, Container, createDecorator } from '@viness/di'
import { generateId } from './id'
import { VinessRoute, VinessRouteObject } from './route'
import { IVinessRouter, VinessRouter } from './router'

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

        const id = `VinessRoute_${routeObj.id || generateId()}`
        const IRouteDecorator = createDecorator<VinessRoute>(id)

        class Route extends VinessRoute {
            constructor(@IVinessRouter router: VinessRouter) {
                super(routeObj, IRouteDecorator, router)
            }
        }

        this.container.register(IRouteDecorator, Route)
        vinessRouter.addRoute(IRouteDecorator, parentRouteId)

        return IRouteDecorator
    }
}
