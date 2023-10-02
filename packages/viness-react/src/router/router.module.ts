import { SyncDescriptor } from '@viness/di'
import { ContaienrUtil } from '../container'
import { createModule } from '../app/module/module'
import { RouterParams, VinessRouter } from './router'
import { IVinessRouter, RouterConfig } from './router.protocol'
import { convertToReactRoutes, convertToVinessRouteProviders } from './route-tree'
import { doLog } from '../utils'

export function createRouterModule(config: RouterConfig) {
    const { type, basename, routeTree } = config

    const routes = convertToReactRoutes(routeTree)
    const routeProviders = convertToVinessRouteProviders(routeTree)

    const routerParams: RouterParams = { type, routes, basename }

    doLog(routes)

    const descriptor = new SyncDescriptor(VinessRouter, [routerParams], true)
    ContaienrUtil.register(IVinessRouter, descriptor)

    const module = createModule({
        providers: routeProviders
    })
    return module
}

export class RouterModule {
    static forRoot(config: RouterConfig) {
        return createRouterModule(config)
    }
}
