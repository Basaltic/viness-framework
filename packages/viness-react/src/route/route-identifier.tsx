import { createIdentifier, VinessServiceIdentifier } from '../identifier'
import { VinessRouteObject } from './route'

export interface VinessRouteIdentifer<T> extends VinessServiceIdentifier<T> {
    addChild(routeObj: VinessRouteObject): VinessRouteIdentifer<T>
}

export function createRouteIdentifer<T>(routeId: string): VinessRouteIdentifer<T> {
    const id = createIdentifier(routeId) as VinessRouteIdentifer<T>

    return id
}
