import { SyncDescriptor } from '@viness/di'
import { ContaienrUtil } from '../app/container'
import { VinessInjectionToken, createToken } from '../token'
import { VinessRoute } from './route'
import { IVinessRoute, VinessRouteMetadata } from './route.protocol'

export class RouteFactory {
    static create<Path extends string>(token: VinessInjectionToken<IVinessRoute<Path>>, params: VinessRouteMetadata<Path>) {
        const ctor = new SyncDescriptor(VinessRoute, [params])
        ContaienrUtil.register(token, ctor)
        return ContaienrUtil.get(token)
    }

    static createToken<Path extends string>(path: Path, metadata: VinessRouteMetadata<Path>) {
        const routeToken = createToken<IVinessRoute<Path>>(path || 'route')
        return routeToken
    }

    static createWithToken<Path extends string>(params: VinessRouteMetadata<Path>) {
        const routeToken = createToken<IVinessRoute<Path>>(params.path || 'route')
        const ctor = new SyncDescriptor(VinessRoute, [params])
        ContaienrUtil.register(routeToken, ctor)
        const route = ContaienrUtil.get(routeToken)
        return { token: routeToken, route }
    }
}
