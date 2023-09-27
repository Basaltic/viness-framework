import { VinessInjectionToken } from '../token'
import { IVinessRoute, VinessRouteMetadata, VinessRouteInjectionToken } from './route.protocol'
import { VinessRoute } from './route'
import { Injectable } from '../app'

export const INJECTABLE_ROUTE = '$viness:route'

export const parentToChildren = new Map<VinessRouteInjectionToken<any>, VinessRouteInjectionToken<any>>()

export function InjetableRoute<P extends string>(
    token: VinessInjectionToken<IVinessRoute<P>>,
    meta: VinessRouteMetadata<P>
): ClassDecorator {
    return (target: any) => {
        // if target is instance of Viness Route，then use it
        // otherwise, use the metadata to create a new VinessRoute
        if (target.VROOT) {
            Object.defineProperty(target, INJECTABLE_ROUTE, { value: meta })
            Injectable(token)(target)
            return target
        } else {
            class NRoute extends VinessRoute<any> {}
            Object.defineProperty(NRoute, 'name', { value: target.name })
            Object.defineProperty(target, INJECTABLE_ROUTE, { value: meta })
            Injectable(token)(NRoute)

            return NRoute
        }
    }
}
