import { VinessInjectionToken } from '../token'
import { IVinessRoute, VinessRouteMetadata, VinessRouteInjectionToken } from './route.protocol'
import { VinessRoute } from './route'
import { Injectable } from '../app'

export const INJECTABLE_ROUTE = '$viness:route'

export const parentToChildren = new Map<VinessRouteInjectionToken<any>, VinessRouteInjectionToken<any>>()

export function Route<P extends string>(token: VinessInjectionToken<IVinessRoute<P>>, meta: VinessRouteMetadata<P>): ClassDecorator {
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

// const A = ''
// const AA = ''
// const B = ''

// @Route({

// })
// class XXXRoute {

// }

// const routeTree = [
//     {r: A, children: [AA]},
//     B
// ]

// 路由的定义 和 路由之间的关联 分开定义
// 路由树，在内部转换为 react-router的 路由树
