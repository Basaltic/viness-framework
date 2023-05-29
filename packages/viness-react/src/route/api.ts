import { VinessRouteIdentifer, VinessRouteObject } from './route'
import { vinessRouter } from './router'

/**
 * Create a new route
 *
 * @param routeObject
 * @returns an identifier used to fetch route instance in components or services
 */
export function registerRoute(routeObject: VinessRouteObject): VinessRouteIdentifer {
    const IRouteDecorator = vinessRouter.register(routeObject)
    return IRouteDecorator
}
